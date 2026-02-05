import type { Members, Problem, GitHubTreeItem } from '../types';

const WEEK_PATTERN = /^\d{2}-\d{2}-w\d+$/;

export function parseSource(filename: string): 'swea' | 'boj' | 'etc' {
  const lower = filename.toLowerCase();
  if (lower.startsWith('swea-') || lower.startsWith('swea_')) return 'swea';
  if (lower.startsWith('boj-') || lower.startsWith('boj_')) return 'boj';
  return 'etc';
}

export function parseSourceFromCode(code: string): 'swea' | 'boj' | 'etc' | null {
  const match = code.match(/^#\s*@source:\s*(\w+)/m);
  if (!match) return null;
  const source = match[1].toLowerCase();
  if (source === 'swea') return 'swea';
  if (source === 'boj') return 'boj';
  return 'etc';
}

export function parseVersionFromName(name: string): { baseName: string; version: number | undefined } {
  const match = name.match(/^(.+)-v(\d+)$/);
  if (match) {
    return { baseName: match[1], version: parseInt(match[2], 10) };
  }
  return { baseName: name, version: undefined };
}

export function parseProblemsFromTree(tree: GitHubTreeItem[], members: Members): Problem[] {
  const memberIds = new Set(Object.keys(members));
  const problems: Problem[] = [];
  const mdFiles = new Set<string>();

  for (const item of tree) {
    if (item.type === 'blob' && item.path.endsWith('.md')) {
      mdFiles.add(item.path.replace(/\.md$/, ''));
    }
  }

  for (const item of tree) {
    if (item.type !== 'blob') continue;
    if (!item.path.endsWith('.py')) continue;

    const parts = item.path.split('/');
    if (parts.length !== 3) continue;

    const [memberId, week, filename] = parts;
    if (!memberIds.has(memberId)) continue;
    if (!WEEK_PATTERN.test(week)) continue;

    const name = filename.replace(/\.py$/, '');
    const basePath = item.path.replace(/\.py$/, '');
    const hasNote = mdFiles.has(basePath);
    const { baseName, version } = parseVersionFromName(name);

    problems.push({
      id: `${memberId}/${week}/${name}`,
      member: memberId,
      week,
      name,
      source: parseSource(filename),
      path: item.path,
      hasNote,
      notePath: hasNote ? `${basePath}.md` : undefined,
      version,
      baseName,
    });
  }

  return problems.sort((a, b) => {
    const weekCmp = b.week.localeCompare(a.week);
    if (weekCmp !== 0) return weekCmp;
    return a.name.localeCompare(b.name);
  });
}

export function sortedMemberEntries(members: Members): [string, Members[string]][] {
  return Object.entries(members).sort((a, b) => a[1].name.localeCompare(b[1].name, 'ko'));
}

export function getProblemUrl(name: string, source: 'swea' | 'boj' | 'etc'): string | null {
  // 버전 접미사 제거 후 숫자 추출: "swea-1284-v2" → "1284"
  const baseName = name.replace(/-v\d+$/, '');
  const match = baseName.match(/(\d+)/);
  if (!match) return null;
  const num = match[1];

  if (source === 'boj') {
    return `https://www.acmicpc.net/problem/${num}`;
  }
  if (source === 'swea') {
    return `https://swexpertacademy.com/main/searchAll/search.do?category=&pageIndex=&keyword=${num}`;
  }
  return null;
}

export function extractWeeks(problems: Problem[]): string[] {
  const weeks = new Set(problems.map((p) => p.week));
  return Array.from(weeks).sort((a, b) => b.localeCompare(a));
}

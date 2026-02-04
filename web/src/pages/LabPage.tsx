import { useState, useMemo } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Flame, Trophy, Target, TrendingUp } from 'lucide-react';
import { sortedMemberEntries } from '../services/github';
import type { Members, Problem, Activities } from '../types';

interface Context {
  members: Members;
  problems: Problem[];
  activities: Activities;
  dark: boolean;
}

type BoardType = 'total' | 'streak' | 'weekly';

export default function LabPage() {
  const { members, problems, activities } = useOutletContext<Context>();
  const [activeBoard, setActiveBoard] = useState<BoardType>('total');

  // 전체 풀이 수 랭킹
  const totalRanking = useMemo(() => {
    return sortedMemberEntries(members)
      .map(([id, member]) => ({
        id,
        name: member.name,
        github: member.github,
        value: problems.filter((p) => p.member === id).length,
      }))
      .sort((a, b) => b.value - a.value);
  }, [members, problems]);

  // 스트릭 랭킹
  const streakRanking = useMemo(() => {
    return sortedMemberEntries(members)
      .map(([id, member]) => ({
        id,
        name: member.name,
        github: member.github,
        value: activities[id]?.streak ?? 0,
      }))
      .sort((a, b) => b.value - a.value);
  }, [members, activities]);

  // 이번 주 풀이 수 랭킹
  const weeklyRanking = useMemo(() => {
    const weeks = [...new Set(problems.map((p) => p.week))].sort((a, b) => b.localeCompare(a));
    const currentWeek = weeks[0] || '';
    return sortedMemberEntries(members)
      .map(([id, member]) => ({
        id,
        name: member.name,
        github: member.github,
        value: problems.filter((p) => p.member === id && p.week === currentWeek).length,
      }))
      .sort((a, b) => b.value - a.value);
  }, [members, problems]);

  const boards: { key: BoardType; label: string; icon: typeof Trophy; unit: string }[] = [
    { key: 'total', label: '총 풀이', icon: Trophy, unit: '문제' },
    { key: 'streak', label: '스트릭', icon: Flame, unit: '일' },
    { key: 'weekly', label: '이번 주', icon: Target, unit: '문제' },
  ];

  const rankings = { total: totalRanking, streak: streakRanking, weekly: weeklyRanking };
  const currentRanking = rankings[activeBoard];
  const currentUnit = boards.find((b) => b.key === activeBoard)!.unit;
  const maxValue = Math.max(...currentRanking.map((r) => r.value), 1);

  const medalColors = ['text-yellow-500', 'text-slate-400', 'text-amber-700'];

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">실험실</h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">새로운 기능을 미리 체험해보세요</p>
      </div>

      {/* 리더보드 카드 */}
      <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">리더보드</h2>
          <div className="flex gap-2">
            {boards.map((b) => {
              const Icon = b.icon;
              return (
                <button
                  key={b.key}
                  onClick={() => setActiveBoard(b.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeBoard === b.key
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {currentRanking.map((r, i) => (
            <Link
              key={r.id}
              to={`/member/${r.id}`}
              className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              {/* 순위 */}
              <span className={`w-6 text-center font-bold text-sm ${
                i < 3 && r.value > 0 ? medalColors[i] : 'text-slate-400 dark:text-slate-500'
              }`}>
                {i + 1}
              </span>

              {/* 아바타 + 이름 */}
              <img
                src={`https://github.com/${r.github}.png?size=32`}
                alt={r.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100 flex-1">
                {r.name}
              </span>

              {/* 바 + 수치 */}
              <div className="flex items-center gap-3 w-40">
                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      i === 0 && r.value > 0 ? 'bg-yellow-500' :
                      i === 1 && r.value > 0 ? 'bg-slate-400' :
                      i === 2 && r.value > 0 ? 'bg-amber-700' :
                      'bg-indigo-500'
                    }`}
                    style={{ width: `${(r.value / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 w-12 text-right">
                  {r.value}{currentUnit}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';

function Landing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [stats, setStats] = useState({
    totalProblems: 0,
    difficultyCounts: { Easy: 0, Medium: 0, Hard: 0 },
    tagCounts: {}
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosClient.get('/problem/stats');
        setStats(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleExplore = () => {
    if (isAuthenticated) {
      navigate('/problems');
    } else {
      navigate('/login');
    }
  };

  // List of standard tags for clean rendering
  const standardTags = [
    { key: 'array', label: 'Array' },
    { key: 'string', label: 'String' },
    { key: 'dp', label: 'Dynamic Programming' },
    { key: 'tree', label: 'Tree' },
    { key: 'graph', label: 'Graph' },
    { key: 'linkedList', label: 'Linked List' },
    { key: 'stack', label: 'Stack' },
    { key: 'queue', label: 'Queue' },
    { key: 'function', label: 'Function' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas-night">
      {/* Navigation Header */}
      <nav className="navbar sticky top-0 z-50 backdrop-blur-md bg-canvas-night/95 border-b border-hairline-dark/15 px-6 md:px-12 py-4">
        <div className="flex-1">
          <NavLink to="/" className="font-display font-light text-2xl tracking-wide text-on-primary hover:opacity-80 transition-opacity">
            Logic Leet
          </NavLink>
        </div>
        <div className="flex-none gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {user?.role === 'admin' && (
                <NavLink to="/admin" className="font-body text-sm font-medium text-link-cool-3 hover:text-on-primary transition-colors">
                  Admin Panel
                </NavLink>
              )}
              <NavLink to="/problems" className="font-body text-sm font-medium text-link-cool-3 hover:text-on-primary transition-colors">
                Workspace
              </NavLink>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost font-body text-sm text-on-primary py-2 px-4 rounded-full border border-hairline-dark hover:bg-canvas-night-elevated">
                  {user?.firstName}
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-canvas-night-elevated border border-hairline-dark/30 rounded-box w-52 text-on-primary">
                  <li><button onClick={handleLogout} className="hover:bg-shade-70 transition-colors">Logout</button></li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink to="/login" className="font-body text-sm text-on-primary py-2.5 px-6 rounded-full border border-on-primary/30 hover:border-on-primary hover:bg-on-primary/5 transition-all">
                Log in
              </NavLink>
              <NavLink to="/signup" className="font-body text-sm text-ink bg-on-primary py-2.5 px-6 rounded-full font-medium hover:bg-shade-30 transition-all">
                Sign up
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section (Marketing Track) */}
      <section className="relative min-h-[85vh] flex items-center justify-between overflow-hidden bg-canvas-night px-6 md:px-12 py-16">{/* Full-bleed background/side image with editorial mask */}
        <div className="absolute inset-y-0 right-0 w-full md:w-1/2 opacity-35 md:opacity-85 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-canvas-night via-canvas-night/70 to-transparent z-10"></div>
          <img
            src="/coding_hero.png"
            alt="Cinematic Coding Setup"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Column */}
        <div className="relative z-20 max-w-2xl md:w-1/2 flex flex-col items-start justify-center">
          <span className="font-body text-xs font-semibold tracking-[0.15em] text-link-mint uppercase mb-4">
            Cinematic Algorithmic Workspace
          </span>
          <h1 className="font-display font-light text-5xl md:text-7xl lg:text-8xl text-on-primary leading-[1.05] tracking-tight mb-8">
            Master Data Structures & Algorithms
          </h1>
          <p className="font-body text-lg text-link-cool-3 leading-relaxed mb-10">
            Solve hand-crafted challenges, test code against extensive validation runs, and debug instantly using Llama 4 Scout. A premium space engineered for focus and clarity.
          </p>
          <button
            onClick={handleExplore}
            className="font-body font-medium text-base text-on-primary bg-canvas-night py-3.5 px-8 rounded-full border-2 border-on-primary hover:bg-on-primary hover:text-canvas-night transition-all duration-300 transform active:scale-95 cursor-pointer shadow-lg shadow-black/50"
          >
            Explore Problems
          </button>
        </div>
      </section>

      {/* Transactional Statistics Track (Cream-Mint Canvas) */}
      <section className="bg-canvas-cream text-ink px-6 md:px-12 py-20 md:py-28 flex flex-col items-center">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-16 md:mb-20">
            <span className="font-body text-xs font-semibold tracking-[0.1em] text-shade-60 uppercase mb-2 block">
              Curated Catalog Metrics
            </span>
            <h2 className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-4">
              Real-time platform statistics
            </h2>
            <p className="font-body text-base text-shade-50 max-w-xl mx-auto">
              Our algorithmic repository grows constantly. Browse difficulty bands, explore topics, and target your focus areas.
            </p>
          </div>

          {/* Core Numbers and Difficulty Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Total Problems Banner */}
            <div className="lg:col-span-1 bg-canvas-light p-10 rounded-2xl shadow-[0_8px_16px_-4px_rgba(0,0,0,0.03),_0_0_0_1px_rgba(0,0,0,0.04)] border border-hairline-light flex flex-col justify-between min-h-[220px]">
              <div>
                <h3 className="font-body text-sm font-semibold text-shade-50 uppercase tracking-wider mb-2">
                  Total Problems
                </h3>
                <p className="font-display font-light text-7xl md:text-8xl text-ink leading-none">
                  {loadingStats ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    stats.totalProblems
                  )}
                </p>
              </div>
              <p className="font-body text-sm text-shade-50">
                Optimized problems covering critical algorithmic patterns.
              </p>
            </div>

            {/* Difficulty Categories */}
            <div className="lg:col-span-2 bg-canvas-light p-10 rounded-2xl shadow-[0_8px_16px_-4px_rgba(0,0,0,0.03),_0_0_0_1px_rgba(0,0,0,0.04)] border border-hairline-light">
              <h3 className="font-body text-sm font-semibold text-shade-50 uppercase tracking-wider mb-6">
                Difficulty Levels
              </h3>

              {loadingStats ? (
                <div className="flex items-center justify-center py-10">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Easy */}
                  <div className="bg-canvas-cream p-6 rounded-xl border border-hairline-light/50 flex flex-col justify-between">
                    <div>
                      <span className="font-body text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                        Easy
                      </span>
                      <p className="font-display font-light text-5xl text-ink mt-4">
                        {stats.difficultyCounts.Easy || 0}
                      </p>
                    </div>
                    <p className="font-body text-xs text-shade-50 mt-4">Core building blocks and logic setup.</p>
                  </div>

                  {/* Medium */}
                  <div className="bg-canvas-cream p-6 rounded-xl border border-hairline-light/50 flex flex-col justify-between">
                    <div>
                      <span className="font-body text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                        Medium
                      </span>
                      <p className="font-display font-light text-5xl text-ink mt-4">
                        {stats.difficultyCounts.Medium || 0}
                      </p>
                    </div>
                    <p className="font-body text-xs text-shade-50 mt-4">Standard patterns and optimization steps.</p>
                  </div>

                  {/* Hard */}
                  <div className="bg-canvas-cream p-6 rounded-xl border border-hairline-light/50 flex flex-col justify-between">
                    <div>
                      <span className="font-body text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                        Hard
                      </span>
                      <p className="font-display font-light text-5xl text-ink mt-4">
                        {stats.difficultyCounts.Hard || 0}
                      </p>
                    </div>
                    <p className="font-body text-xs text-shade-50 mt-4">Complex constraints and nested patterns.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Topic-Based Categories */}
          <div className="bg-canvas-light p-10 rounded-2xl shadow-[0_8px_16px_-4px_rgba(0,0,0,0.03),_0_0_0_1px_rgba(0,0,0,0.04)] border border-hairline-light mb-16">
            <h3 className="font-body text-sm font-semibold text-shade-50 uppercase tracking-wider mb-8">
              Explore by Category
            </h3>

            {loadingStats ? (
              <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-md"></span>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {standardTags.map((tag) => {
                  const count = stats.tagCounts[tag.key] || 0;
                  return (
                    <div
                      key={tag.key}
                      className="group p-5 rounded-xl border border-hairline-light hover:bg-aloe-10 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[110px]"
                      onClick={handleExplore}
                    >
                      <h4 className="font-body text-sm font-semibold text-ink group-hover:text-ink transition-colors">
                        {tag.label}
                      </h4>
                      <div className="flex justify-between items-baseline mt-4">
                        <span className="font-body text-xs text-shade-50 group-hover:text-shade-60">Problems</span>
                        <span className="font-display font-light text-3xl text-ink">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* CTA Band */}
          <div className="bg-pistachio-10 p-10 md:p-12 rounded-2xl border border-hairline-light flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-display font-light text-3xl text-ink mb-2">
                Ready to test your limits?
              </h3>
              <p className="font-body text-sm text-shade-60 max-w-lg">
                Log in to write code, review execution metrics, and consult our built-in tutor when you run into performance roadblocks.
              </p>
            </div>
            <button
              onClick={handleExplore}
              className="font-body font-medium text-sm text-on-primary bg-primary-brand py-3.5 px-8 rounded-full hover:bg-shade-70 transition-all transform active:scale-95 cursor-pointer flex-shrink-0"
            >
              Explore Workspace
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-canvas-night text-shade-40 border-t border-hairline-dark/15 px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-display font-light text-xl text-on-primary mb-2">
              Logic Leet
            </span>
            <p className="font-body text-xs text-shade-50 text-center md:text-left">
              An elegant platform for mastery of data structures and algorithms.
            </p>
          </div>
          <div className="flex gap-8 text-xs font-body">
            <NavLink to="/login" className="hover:text-on-primary transition-colors">Log In</NavLink>
            <NavLink to="/signup" className="hover:text-on-primary transition-colors">Sign Up</NavLink>
            <NavLink to="/problems" className="hover:text-on-primary transition-colors">Problems</NavLink>
          </div>
          <p className="font-body text-[11px] text-shade-60">
            © {new Date().getFullYear()} Logic Leet. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;

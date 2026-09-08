import { ArrowRight, Briefcase, FileText, CheckCircle2 } from 'lucide-react';

const TodayDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-text">Good morning.</h1>
        <p className="text-subtext mt-2 text-lg">You have 7 new opportunities worth reviewing.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-primary text-white border-transparent">
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-accent" />
            <span className="font-medium">3 strong matches</span>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-subtext" />
            <span className="font-medium">2 applications ready</span>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-orange-500" />
            <span className="font-medium text-text">1 follow-up due</span>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Recommended for you</h2>
        
        <div className="card hover:border-accent/50 transition-colors cursor-pointer flex items-center justify-between group">
          <div>
            <h3 className="text-lg font-semibold">Java Developer</h3>
            <p className="text-subtext text-sm mt-1">Berlin · Example GmbH</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-accent font-medium text-sm">94% match</div>
              <div className="text-subtext text-xs mt-0.5">Strong skills alignment</div>
            </div>
            <button className="btn-secondary group-hover:bg-primary group-hover:text-white transition-all">
              Review <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-lg font-semibold">Follow-up</h2>
        <div className="card border-orange-200 bg-orange-50/30 flex items-center justify-between">
          <div>
            <h3 className="font-medium">Data Analyst — ABC France</h3>
            <p className="text-subtext text-sm mt-1">You applied 6 days ago.</p>
          </div>
          <button className="btn-secondary bg-white">
            Review follow-up
          </button>
        </div>
      </section>
    </div>
  );
};

export default TodayDashboard;

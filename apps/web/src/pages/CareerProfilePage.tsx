import { ShieldCheck } from 'lucide-react';

const CareerProfilePage = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-text">Career Profile</h1>
          <p className="text-subtext mt-1">Your verified source of truth.</p>
        </header>
        <button className="btn-primary">Edit Profile</button>
      </div>

      <div className="card space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Professional Summary</h3>
          <p className="text-text leading-relaxed">
            Data Analyst and Software Engineer with experience in building scalable backend systems
            and analytical dashboards. Specialized in Java, Spring Boot, React, and Data Analytics.
          </p>
        </div>
        
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-semibold mb-4">Verified Skills</h3>
          <div className="flex flex-wrap gap-2">
            {['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Data Analysis', 'Power BI'].map((skill) => (
              <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-sm font-medium">
                {skill}
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              </span>
            ))}
          </div>
          <p className="text-xs text-subtext mt-3 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" /> 
            Skills marked with a badge are verified by the CareerOS truth layer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerProfilePage;

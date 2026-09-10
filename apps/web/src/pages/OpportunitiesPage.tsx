import { useQuery } from '@tanstack/react-query';
import { Briefcase, MapPin, TrendingUp, ArrowRight, ExternalLink } from 'lucide-react';
import { api } from '../services/api';
import type { JobOpportunity } from '../types';

const SCORE_COLOR = (score: number) => {
  if (score >= 85) return 'text-green-600 bg-green-50';
  if (score >= 70) return 'text-yellow-600 bg-yellow-50';
  return 'text-gray-500 bg-gray-50';
};

const STATUS_BADGE: Record<string, string> = {
  NEW: 'bg-blue-50 text-blue-600',
  APPLIED: 'bg-purple-50 text-purple-600',
  SAVED: 'bg-gray-50 text-gray-600',
};

function OpportunityCard({ job }: { job: JobOpportunity }) {
  return (
    <div className="card hover:shadow-md hover:border-accent/30 transition-all cursor-pointer group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_BADGE[job.status] || 'bg-gray-50 text-gray-500'}`}>
              {job.status}
            </span>
            <span className="text-xs text-subtext">{new Date(job.publicationDate).toLocaleDateString()}</span>
          </div>
          <h3 className="font-semibold text-lg leading-tight">{job.title}</h3>
          <p className="text-subtext font-medium">{job.company}</p>
          <div className="flex items-center gap-1 mt-1.5 text-sm text-subtext">
            <MapPin className="w-3.5 h-3.5" />
            {job.location}
          </div>
          <p className="text-sm text-subtext mt-2 line-clamp-2">{job.description}</p>
        </div>
        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-sm ${SCORE_COLOR(job.matchScore)}`}>
            <TrendingUp className="w-4 h-4" />
            {job.matchScore}%
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
        <a
          href={job.url}
          target="_blank"
          rel="noreferrer"
          onClick={e => e.stopPropagation()}
          className="btn-secondary text-xs py-1.5 px-3"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Original posting
        </a>
        <button className="btn-primary text-xs py-1.5 px-3 ml-auto">
          Review <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

const OpportunitiesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['opportunities'],
    queryFn: () => api.opportunities.list() as Promise<JobOpportunity[]>,
  });

  const jobs: JobOpportunity[] = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Opportunities</h1>
          <p className="text-subtext mt-1">Sorted by your match score.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-subtext">{jobs.length} opportunities</span>
        </div>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="card animate-pulse h-44 bg-gray-50" />)}
        </div>
      )}

      {!isLoading && jobs.length === 0 && (
        <div className="card text-center py-16">
          <Briefcase className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <h3 className="font-medium">No opportunities yet</h3>
          <p className="text-sm text-subtext mt-1">Opportunities will appear here as they are discovered.</p>
        </div>
      )}

      <div className="space-y-4">
        {jobs.map(job => <OpportunityCard key={job.id} job={job} />)}
      </div>
    </div>
  );
};

export default OpportunitiesPage;

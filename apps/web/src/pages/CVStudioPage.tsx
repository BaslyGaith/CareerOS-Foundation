import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, FileText, Copy, Trash2, Upload, CheckCircle2, Clock, Archive, Globe, Star } from 'lucide-react';
import { api, DEMO_USER_ID, DEMO_PROFILE_ID } from '../services/api';
import type { CVSummary, CVLanguage, Document } from '../types';

const LANGUAGE_LABELS: Record<CVLanguage, string> = {
  ENGLISH: '🇬🇧 English',
  FRENCH: '🇫🇷 French',
  GERMAN: '🇩🇪 German',
  ARABIC: '🇸🇦 Arabic',
  SPANISH: '🇪🇸 Spanish',
};

const STATUS_CONFIG = {
  ACTIVE: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', label: 'Active' },
  DRAFT: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Draft' },
  ARCHIVED: { icon: Archive, color: 'text-gray-400', bg: 'bg-gray-50', label: 'Archived' },
};

function CVCard({ cv, onDuplicate, onDelete }: { cv: CVSummary; onDuplicate: (id: string) => void; onDelete: (id: string) => void }) {
  const cfg = STATUS_CONFIG[cv.status];
  const StatusIcon = cfg.icon;
  return (
    <div className="card hover:shadow-md transition-all cursor-pointer group">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="p-2 bg-secondary rounded-lg mt-0.5">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-text truncate">{cv.name}</h3>
            <p className="text-sm text-subtext mt-0.5">{cv.targetRole || 'General'}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1 text-xs text-subtext">
                <Globe className="w-3.5 h-3.5" />
                {LANGUAGE_LABELS[cv.language]}
              </span>
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                <StatusIcon className="w-3 h-3" />
                {cfg.label}
              </span>
              {cv.sourceJobId && (
                <span className="text-xs text-accent font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" /> Tailored
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
          <button
            onClick={e => { e.stopPropagation(); onDuplicate(cv.id); }}
            className="p-1.5 text-subtext hover:text-text hover:bg-secondary rounded transition-colors"
            title="Duplicate"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onDelete(cv.id); }}
            className="p-1.5 text-subtext hover:text-red-500 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-subtext">
        <span>v{cv.version} · {cv.targetMarket || 'All markets'}</span>
        <span>Updated {new Date(cv.updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

function CreateCVModal({ onClose, onCreate }: { onClose: () => void; onCreate: (data: unknown) => void }) {
  const [name, setName] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [language, setLanguage] = useState<CVLanguage>('ENGLISH');
  const [targetMarket, setTargetMarket] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({
      userId: DEMO_USER_ID,
      profileId: DEMO_PROFILE_ID,
      name: name.trim(),
      targetRole: targetRole.trim(),
      targetMarket: targetMarket.trim(),
      language,
      template: 'CLEAN',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-1">Create new CV</h2>
        <p className="text-sm text-subtext mb-5">Built from your verified career facts.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">CV name <span className="text-red-500">*</span></label>
            <input
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Data Analyst — English"
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Target role</label>
            <input
              value={targetRole}
              onChange={e => setTargetRole(e.target.value)}
              placeholder="e.g. Data Analyst"
              className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value as CVLanguage)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {Object.entries(LANGUAGE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Target market</label>
              <input
                value={targetMarket}
                onChange={e => setTargetMarket(e.target.value)}
                placeholder="e.g. Germany"
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1">Create CV</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DocumentRow({ doc, onDelete }: { doc: Document; onDelete: (id: string) => void }) {
  const kb = Math.round((doc.fileSizeBytes || 0) / 1024);
  const statusColor = doc.parseStatus === 'PARSED' ? 'text-green-600' : doc.parseStatus === 'FAILED' ? 'text-red-500' : 'text-yellow-600';
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-secondary rounded">
          <FileText className="w-4 h-4 text-subtext" />
        </div>
        <div>
          <p className="text-sm font-medium text-text">{doc.originalFilename}</p>
          <p className="text-xs text-subtext">{doc.documentType} · {kb} KB · <span className={statusColor}>{doc.parseStatus}</span></p>
        </div>
      </div>
      <button
        onClick={() => onDelete(doc.id)}
        className="p-1.5 text-subtext hover:text-red-500 hover:bg-red-50 rounded transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

const CVStudioPage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState<'cvs' | 'documents'>('cvs');
  const fileRef = useRef<HTMLInputElement>(null);
  const qc = useQueryClient();

  const cvsQuery = useQuery({ queryKey: ['cvs'], queryFn: () => api.cvs.list(DEMO_USER_ID) as Promise<CVSummary[]> });
  const docsQuery = useQuery({ queryKey: ['documents'], queryFn: () => api.documents.list(DEMO_USER_ID) as Promise<Document[]> });

  const createMutation = useMutation({
    mutationFn: (data: unknown) => api.cvs.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cvs'] }),
  });
  const dupMutation = useMutation({
    mutationFn: (id: string) => api.cvs.duplicate(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cvs'] }),
  });
  const deleteCVMutation = useMutation({
    mutationFn: (id: string) => api.cvs.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cvs'] }),
  });
  const deleteDocMutation = useMutation({
    mutationFn: (id: string) => api.documents.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['documents'] }),
  });
  const uploadMutation = useMutation({
    mutationFn: (file: File) => api.documents.upload(DEMO_USER_ID, 'CV_UPLOAD', file),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['documents'] }),
  });

  const cvs: CVSummary[] = (cvsQuery.data as CVSummary[]) || [];
  const docs: Document[] = (docsQuery.data as Document[]) || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CV Studio</h1>
          <p className="text-subtext mt-1">Your CVs, built from verified career facts.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="btn-secondary"
          >
            <Upload className="w-4 h-4" /> Upload CV
          </button>
          <button onClick={() => setShowCreate(true)} className="btn-primary">
            <Plus className="w-4 h-4" /> New CV
          </button>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            accept=".pdf,.docx,.txt"
            onChange={e => {
              const f = e.target.files?.[0];
              if (f) uploadMutation.mutate(f);
              e.target.value = '';
            }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {(['cvs', 'documents'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-primary text-primary -mb-px'
                : 'text-subtext hover:text-text'
            }`}
          >
            {tab === 'cvs' ? `CVs (${cvs.length})` : `Documents (${docs.length})`}
          </button>
        ))}
      </div>

      {activeTab === 'cvs' && (
        <>
          {cvsQuery.isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1,2,3].map(i => <div key={i} className="card animate-pulse h-32 bg-gray-50" />)}
            </div>
          )}
          {!cvsQuery.isLoading && cvs.length === 0 && (
            <div className="card text-center py-16">
              <FileText className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <h3 className="font-medium text-text">No CVs yet</h3>
              <p className="text-sm text-subtext mt-1 mb-4">Create your first CV from your verified career profile.</p>
              <button onClick={() => setShowCreate(true)} className="btn-primary mx-auto">
                <Plus className="w-4 h-4" /> Create your first CV
              </button>
            </div>
          )}
          {cvs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cvs.map(cv => (
                <CVCard
                  key={cv.id}
                  cv={cv}
                  onDuplicate={id => dupMutation.mutate(id)}
                  onDelete={id => { if (confirm('Delete this CV?')) deleteCVMutation.mutate(id); }}
                />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'documents' && (
        <div className="card">
          {docsQuery.isLoading && <p className="text-subtext text-sm">Loading documents...</p>}
          {!docsQuery.isLoading && docs.length === 0 && (
            <div className="text-center py-10">
              <Upload className="w-8 h-8 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-subtext">No documents uploaded yet.</p>
              <button onClick={() => fileRef.current?.click()} className="btn-secondary mt-3 mx-auto">
                <Upload className="w-4 h-4" /> Upload a CV or document
              </button>
            </div>
          )}
          {docs.map(doc => (
            <DocumentRow
              key={doc.id}
              doc={doc}
              onDelete={id => { if (confirm('Delete this document?')) deleteDocMutation.mutate(id); }}
            />
          ))}
          {uploadMutation.isPending && (
            <p className="text-sm text-subtext animate-pulse py-2">Uploading...</p>
          )}
        </div>
      )}

      {showCreate && (
        <CreateCVModal
          onClose={() => setShowCreate(false)}
          onCreate={data => createMutation.mutate(data)}
        />
      )}
    </div>
  );
};

export default CVStudioPage;

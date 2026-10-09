import React from 'react';
import { PersonalInfo } from '../../types/resume';
import { User, Briefcase, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../UI/BrandIcons';

interface Props {
  data: PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span>Full Name</span>
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="e.g. Durgesh Sonar"
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span>Professional Title / Headline</span>
          </label>
          <input
            type="text"
            value={data.jobTitle}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            placeholder="e.g. B.Tech CSE (AI & ML) | AI & IoT Developer"
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>Email Address</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="e.g. contact@example.com"
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            <span>Phone Number</span>
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="e.g. +91 98765 43210"
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>Location (City, State / Country)</span>
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="e.g. Nashik, Maharashtra, India"
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
            <GithubIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>GitHub Profile URL / Handle</span>
          </label>
          <input
            type="text"
            value={data.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="e.g. github.com/username"
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
            <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>LinkedIn Profile URL</span>
          </label>
          <input
            type="text"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="e.g. linkedin.com/in/username"
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>Portfolio Website / Link</span>
          </label>
          <input
            type="text"
            value={data.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="e.g. https://myportfolio.com"
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, Bookmark, DollarSign } from "lucide-react";

export default function JobCard({ job, platform }) {

  const formatSalary = (min, max) => {
    if (!min && !max) return null;
    const formatLPA = (num) => `${(num / 100000).toFixed(1)}`;
    
    if (min && max) return `${formatLPA(min)}-${formatLPA(max)} LPA`;
    if (min) return `${formatLPA(min)} LPA+`;
    return `Up to ${formatLPA(max)} LPA`;
  };

  const getExperienceLabel = () => {
    const levels = {
      entry: "0-2 years",
      mid: "2-5 years",
      senior: "5+ years",
      executive: "10+ years"
    };
    return levels[job.experience_level] || job.experience_level;
  }
  
  const salary = formatSalary(job.salary_min, job.salary_max);

  // Get platform info - use either the passed platform or create from job data
  const platformInfo = platform || { 
    name: job.platform_name || 'Job Portal',
    logo_url: null 
  };

  // Platform logo URLs mapping
  const platformLogos = {
    'Naukri.com': 'https://logos-world.net/wp-content/uploads/2021/02/Naukri-Logo.png',
    'LinkedIn': 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
    'Indeed India': 'https://logos-world.net/wp-content/uploads/2021/02/Indeed-Symbol.png',
    'Monster India': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHqjN8D8mL6kW8fKr7HqrJqKvV4cKGp3xdcw&s',
    'Shine.com': 'https://media.glassdoor.com/sql/735478/shine-com-squarelogo-1455614915461.png',
    'HackerEarth': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoaEw7NcqKJJP8YKrF8XjO9Q5-GrfOInQRmw&s',
    'AngelList India': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqvF9fUYcaX8GnGa-xrS7JnQwHqoL1VbI1OQ&s',
    'Upwork': 'https://logos-world.net/wp-content/uploads/2021/03/Upwork-Logo.png'
  };

  const logoUrl = platformInfo.logo_url || platformLogos[platformInfo.name];

  return (
    <Card className="hover:shadow-md hover:border-blue-300 transition-all duration-200 bg-white">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              {Date.now() - new Date(job.created_date || job.posted_date).getTime() < 7 * 24 * 60 * 60 * 1000 && (
                <Badge className="bg-green-100 text-green-800 border-green-200 font-medium text-xs">New</Badge>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer mb-1 leading-tight">
              {job.title}
            </h3>
            <p className="text-base text-gray-800 font-medium mb-3">{job.company}</p>

            <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 flex-shrink-0" /> 
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 flex-shrink-0" /> 
                {getExperienceLabel()}
              </span>
              {salary && (
                <span className="flex items-center gap-1.5 font-medium text-gray-900">
                  <DollarSign className="w-4 h-4 flex-shrink-0" />
                  ₹ {salary}
                </span>
              )}
              <span className="flex items-center gap-1.5 capitalize">
                <Clock className="w-4 h-4 flex-shrink-0" /> 
                {job.job_type?.replace('-', ' ') || 'Full time'}
              </span>
            </div>
            
            {job.description && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {job.description}
              </p>
            )}

            {job.skills_required && job.skills_required.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {job.skills_required.slice(0, 4).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs border-blue-200">
                    {skill}
                  </Badge>
                ))}
                {job.skills_required.length > 4 && (
                  <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs">
                    +{job.skills_required.length - 4} more
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Right side - Platform info and actions */}
          <div className="flex flex-col items-end gap-4 min-w-[120px] flex-shrink-0">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-600 self-end">
              <Bookmark className="w-5 h-5" />
            </Button>
            
            {/* Platform logo and name */}
            <div className="flex flex-col items-end gap-2">
              {logoUrl ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium text-right leading-tight">
                    {platformInfo.name}
                  </span>
                  <div className="w-8 h-8 bg-white rounded border border-gray-200 p-1 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={logoUrl} 
                      alt={`${platformInfo.name} logo`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<span class="text-xs font-semibold text-gray-600">${platformInfo.name.substring(0, 2).toUpperCase()}</span>`;
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium text-right leading-tight">
                    {platformInfo.name}
                  </span>
                  <div className="w-8 h-8 bg-blue-100 rounded border border-blue-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-blue-600">
                      {platformInfo.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>
              )}
              
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-1 h-8"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
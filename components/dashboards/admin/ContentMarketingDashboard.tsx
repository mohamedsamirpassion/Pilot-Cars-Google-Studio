import React from 'react';
import Card, { CardContent, CardHeader } from '../../Card';

const ContentMarketingDashboard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Content Marketing Dashboard</h2>
      </CardHeader>
      <CardContent>
        <p>This is the dashboard for the content marketing team. Manage blog posts and SEO.</p>
      </CardContent>
    </Card>
  );
};

export default ContentMarketingDashboard;

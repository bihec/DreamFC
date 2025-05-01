import React from 'react';
import Layout from '../components/layout/Layout';
import SettingsForm from '../components/settings/SettingsForm';

const SettingsPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <SettingsForm />
      </div>
    </Layout>
  );
};

export default SettingsPage;
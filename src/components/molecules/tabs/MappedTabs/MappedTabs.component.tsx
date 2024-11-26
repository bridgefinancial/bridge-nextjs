'use client';
import React, { useState, FC } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import ParagraphText from '@/components/atoms/typography/ParagraphText';
import { colors } from '@/theme/theme';

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface MappedTabsProps {
  tabs: TabItem[];
}

const MappedTabs: FC<MappedTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Function to handle tab changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box className="w-full">
      {/* Tabs navigation */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          mb: 3, // Adds margin between the tabs and content
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={
              <ParagraphText
                sx={{
                  fontSize: 16,
                  color:
                    activeTab === index ? colors.bridgeDarkPurple : 'inherit',
                  fontWeight: activeTab === index ? 'bold' : 'normal',
                }}
              >
                {tab.label}
              </ParagraphText>
            }
            sx={{
              textTransform: 'none', // Disable uppercase text
            }}
          />
        ))}
      </Tabs>

      {/* Conditional rendering of the active tab's content */}
      <Box>{tabs[activeTab] && tabs[activeTab].content}</Box>
    </Box>
  );
};

export default MappedTabs;

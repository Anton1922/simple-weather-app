import React, { useCallback, useState } from 'react';

import { TopBar, ActionList } from '@shopify/polaris';

import './Header.scss';

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearchValue('');
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search"
      showFocusBorder
    />
  );

  const searchResultsMarkup = (
    <ActionList
      items={[{content: 'Shopify help center'}, {content: 'Community forums'}]}
    />
  );

  return (
    <div className="header">
      <TopBar 
        searchField={searchFieldMarkup} 
        searchResultsVisible={isSearchActive} 
        onSearchResultsDismiss={handleSearchResultsDismiss}
        searchResults={searchResultsMarkup}
      >
      </TopBar>
    </div>
  );
};

export default Header;

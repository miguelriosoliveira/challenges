import { Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';

import { FilterSettings, SortBySettings } from './components';

import './App.css';

interface Currency {
  id: string;
  name: string;
  code: string;
  supportsTestMode: boolean;
  isSupportedInUS: boolean;
}

interface Filters {
  isSupportedInUS: boolean | null;
  supportsTestMode: boolean | null;
}

type SortBy = 'name' | 'code' | 'random';

function filterCurrencies(currencies: Currency[], filters: Filters) {
  const activeFilters = Object.entries(filters).filter(([, filterStatus]) => filterStatus !== null);
  let filteredCurrencies = [...currencies];
  activeFilters.forEach(([filterName, filterStatus]) => {
    const filter = filterName as keyof Filters;
    filteredCurrencies = filteredCurrencies.filter(currency => currency[filter] === filterStatus);
  });
  return filteredCurrencies;
}

function sortCurrencies(currencies: Currency[], sortBy: SortBy) {
  let compareFunction =
    sortBy === 'random'
      ? () => 0.5 - Math.random()
      : (a: Currency, b: Currency) => (a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1);

  return [...currencies].sort(compareFunction);
}

const FILTERS_INITIAL_STATE = {
  isSupportedInUS: null,
  supportsTestMode: null,
};

export function App() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [filters, setFilters] = useState<Filters>(FILTERS_INITIAL_STATE);

  useEffect(() => {
    axios
      .get<Currency[]>('https://api.moonpay.com/v3/currencies')
      .then(({ data }) =>
        setCurrencies(data.map(currency => ({ ...currency, code: currency.code.toUpperCase() }))),
      )
      .catch(console.error);
  }, []);

  function handleChangeFilter({ target: { name, checked } }: ChangeEvent<HTMLInputElement>) {
    setFilters({ ...filters, [name]: checked });
  }

  function handleResetFilters() {
    setFilters(FILTERS_INITIAL_STATE);
  }

  function handleChangeSortBy({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setSortBy(value as SortBy);
  }

  function handleShuffleCurrencies() {
    setSortBy('random');
    setCurrencies(sortCurrencies(currencies, 'random'));
  }

  const filteredCurrencies = filterCurrencies(currencies, filters);
  const sortedCurrencies = sortCurrencies(filteredCurrencies, sortBy);

  return (
    <div className="App">
      <Grid container spacing={2} alignItems="end" justifyContent="space-evenly">
        <Grid item xs={12} sm="auto">
          <FilterSettings
            filters={filters}
            onChange={handleChangeFilter}
            onReset={handleResetFilters}
          />
        </Grid>

        <Grid item xs={12} sm="auto">
          <SortBySettings
            sortBy={sortBy}
            onChange={handleChangeSortBy}
            onShuffle={handleShuffleCurrencies}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {sortedCurrencies.map(currency => (
          <Grid key={currency.id} item xs={12} sm={6} md={4}>
            <Paper elevation={2} className="currency-block">
              {currency.name} - <b>{currency.code}</b>
              <Typography variant="caption">
                <br />
                is supported in US? {currency.isSupportedInUS ? '✅' : '❌'}
                <br />
                supports test mode? {currency.supportsTestMode ? '✅' : '❌'}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

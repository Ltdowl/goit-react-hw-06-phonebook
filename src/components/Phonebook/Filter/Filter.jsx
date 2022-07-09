import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, getFilter } from 'redux/ContactsSlice';

export function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const onChange = e =>
    dispatch(setFilter(e.target.value));
  return (
    <label>
      <p style={{ textAlign: 'center' }}>Find contact by name</p>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={onChange}
        style={{ display: 'block', margin: '0 auto' }}
      />
    </label>
  );
}

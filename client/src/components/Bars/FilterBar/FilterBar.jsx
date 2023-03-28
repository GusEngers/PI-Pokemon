import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleaningFilter,
  filteringOrder,
  filteringType,
  obtainedTypes,
} from '../../../redux/actions';

function UsedFilter({ filtering, setFiltering, dispatch }) {
  const deleteFiltering = () => {
    dispatch(cleaningFilter());
    setFiltering(filtering.slice(0, -1));
  };

  return (
    <>
      {filtering.map((filter) => (
        <span>{filter}</span>
      ))}
      {!filtering.length ? null : (
        <button onClick={() => deleteFiltering()}>x</button>
      )}
    </>
  );
}

export default function FilterBar() {
  const dispatch = useDispatch();
  const { types } = useSelector((state) => state);
  const [filtering, setFiltering] = React.useState([]);

  React.useEffect(() => {
    if (!types.length) {
      dispatch(obtainedTypes());
    }
  }, [dispatch, types]);

  const handleType = (event) => {
    dispatch(filteringType(event.target.value));
    setFiltering([...filtering, event.target.value]);
    event.target.value = '';
  };

  const handleOrder = (event) => {
    dispatch(filteringOrder(event.target.value));
    setFiltering([...filtering, event.target.value]);
    event.target.value = '';
  };

  const filterIsValid = (filter) => {
    return filtering.some((f) => f === filter);
  };

  return (
    <nav>
      <label>
        Select type:
        <select name="types" onChange={(event) => handleType(event)}>
          <option value="">-- Type --</option>
          {!types.length
            ? null
            : types.map((type) => (
                <option
                  value={type.name}
                  key={type.id}
                  disabled={filterIsValid(type.name)}
                >
                  {type.name}
                </option>
              ))}
        </select>
      </label>
      <label>
        Select order:
        <select name="order" onChange={(event) => handleOrder(event)}>
          <option value="">-- Order --</option>
          <option value="A-Z" disabled={filterIsValid('A-Z')}>
            A-Z
          </option>
          <option value="Z-A" disabled={filterIsValid('Z-A')}>
            Z-A
          </option>
          <option value="ATK+" disabled={filterIsValid('ATK+')}>
            ATK+
          </option>
          <option value="ATK-" disabled={filterIsValid('ATK-')}>
            ATK-
          </option>
        </select>
      </label>
      <UsedFilter
        filtering={filtering}
        setFiltering={setFiltering}
        dispatch={dispatch}
      />
    </nav>
  );
}

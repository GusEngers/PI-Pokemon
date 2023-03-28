import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleaningFilter,
  filteringOrder,
  filteringOrigin,
  filteringType,
  obtainedTypes,
} from '../../../redux/actions';
import sf from './FilterBar.module.css';

function UsedFilter({ filtering, setFiltering, dispatch }) {
  const deleteFiltering = () => {
    dispatch(cleaningFilter());
    setFiltering(filtering.slice(0, -1));
  };
  let index = filtering.length - 1;

  return (
    <div className={sf.used_container}>
      {filtering.map((filter, ind) => (
        <div key={`${filter}-${ind}`}>
          <span className={sf.span_filter}>{filter}</span>
          {index - ind !== 0 ? (
            <span className={sf.span_separator}>{'>'}</span>
          ) : (
            <button onClick={() => deleteFiltering()} className={sf.button}>
              X
            </button>
          )}
        </div>
      ))}
    </div>
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

  const handleOrigin = (event) => {
    dispatch(filteringOrigin(event.target.value));
    setFiltering([
      ...filtering,
      event.target.value === 'api' ? 'original' : 'created',
    ]);
    event.target.value = '';
  };

  const filterIsValid = (filter) => {
    return filtering.some((f) => f === filter);
  };

  return (
    <nav className={sf.nav_bar}>
      <div className={sf.container}>
        <label className={sf.label}>
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
        <label className={sf.label}>
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
        <label className={sf.label}>
          Select origin:
          <select name="origin" onChange={(event) => handleOrigin(event)}>
            <option value="">-- Origin --</option>
            <option value="api" disabled={filterIsValid('original')}>
              Original Pokemons
            </option>
            <option value="db" disabled={filterIsValid('created')}>
              Created Pokemons
            </option>
          </select>
        </label>
      </div>
      <UsedFilter
        filtering={filtering}
        setFiltering={setFiltering}
        dispatch={dispatch}
      />
    </nav>
  );
}

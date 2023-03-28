import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleaningFilter,
  filteringType,
  obtainedTypes,
} from '../../../redux/actions';

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
    setFiltering([...filtering, `Type: ${event.target.value}`]);
  };

  const deleteFiltering = () => {
    dispatch(cleaningFilter());
    setFiltering(filtering.slice(0, -1));
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
                <option value={type.name} key={type.id}>
                  {type.name}
                </option>
              ))}
        </select>
      </label>
      {filtering.map((filter) => (
        <span>{filter}</span>
      ))}
      {!filtering.length ? null : (
        <button onClick={() => deleteFiltering()}>x</button>
      )}
    </nav>
  );
}

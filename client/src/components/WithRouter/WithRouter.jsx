import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * Función para poder usar useParams en React Class Component
 * @param WrappedComponent Componente el cual inyectaremos params
 * @returns React Class Component con params obtenidos del hook useParams
 */
const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};

export default withRouter;

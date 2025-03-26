import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContractForm from './ContractForm';
import { ContractService } from '../../services/contractService';
import LoadingContainer from '../shared/LoadingContainer';
import ErrorContainer from '../shared/ErrorContainer';
import PropTypes from 'prop-types';

export default function ContractFormPage({ mode = 'edit' }) {
  const { id } = useParams();
  const [contractData, setContractData] = useState(null);
  const [loading, setLoading] = useState(mode === 'edit');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mode === 'edit') {
      const loadContract = async () => {
        try {
          const data = await ContractService.getById(id);
          setContractData(data);
        } catch (err) {
          setError(err.message || 'Error loading contract');
        } finally {
          setLoading(false);
        }
      };
      loadContract();
    }
  }, [id, mode]);

  if (loading) {
    return <LoadingContainer />;
  }

  if (error) {
    return <ErrorContainer message={error} />;
  }

  return <ContractForm contract={contractData} />;
}

ContractFormPage.propTypes = {
  mode: PropTypes.oneOf(['edit', 'create'])
};

ContractFormPage.defaultProps = {
  mode: 'edit'
};
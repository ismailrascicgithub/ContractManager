import React, { memo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';
import dayjs from 'dayjs';
import RowActions from './RowActions';
import PropTypes from 'prop-types';

const ContractTable = ({ contracts, isAdmin, onCommentClick, onEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="contracts table">
        <TableHead>
          <TableRow>
            <TableCell>Reference</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contracts.map((contract) => (
            <ContractRow 
              key={contract.id} 
              contract={contract} 
              isAdmin={isAdmin}
              onCommentClick={onCommentClick}
              onEdit={onEdit}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ContractTable.propTypes = {
  contracts: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onCommentClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

const ContractRow = memo(({ contract, isAdmin, onCommentClick, onEdit }) => (
  <TableRow hover>
    <TableCell>{contract.reference}</TableCell>
    <TableCell>{contract.client?.name}</TableCell>
    <TableCell>{dayjs(contract.start_date).format('DD.MM.YYYY')}</TableCell>
    <TableCell>{dayjs(contract.end_date).format('DD.MM.YYYY')}</TableCell>
    <TableCell>€{contract.value?.toLocaleString()}</TableCell>
    <TableCell>
      <RowActions 
        contract={contract}
        isAdmin={isAdmin}
        onCommentClick={onCommentClick}
        onEdit={onEdit}
      />
    </TableCell>
  </TableRow>
));

ContractRow.propTypes = {
  contract: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onCommentClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ContractTable;
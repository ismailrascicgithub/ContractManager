import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

const RowActions = ({ contract, isAdmin, onCommentClick, onEdit }) => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Tooltip title="View comments">
        <IconButton 
          onClick={() => onCommentClick(contract)}
          size="small"
          color="primary"
          aria-label={`Comments for ${contract.reference}`}
        >
          <CommentIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {isAdmin && (
        <Tooltip title="Edit contract">
          <IconButton
            onClick={() => onEdit(contract)}
            size="small"
            color="secondary"
            aria-label={`Edit ${contract.reference}`}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

RowActions.propTypes = {
  contract: PropTypes.shape({
    id: PropTypes.number.isRequired,
    reference: PropTypes.string.isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onCommentClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default React.memo(RowActions);
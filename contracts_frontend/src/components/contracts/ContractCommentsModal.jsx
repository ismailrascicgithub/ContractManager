import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  CircularProgress,
  Typography,
  DialogActions
} from '@mui/material';
import { Close, Send, Delete, Refresh } from '@mui/icons-material';
import dayjs from 'dayjs';
import { CommentService } from '../../services/commentService';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { getErrorMessage } from '../../utils/errorHandler';

const ContractCommentsModal = ({ contract, onClose, onUpdate }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (contract) {
      loadComments();
    }
  }, [contract]);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const data = await CommentService.getForContract(contract.id);
      setComments(data);
    } catch (error) {
      enqueueSnackbar(
        getErrorMessage(error, 'Error loading comments'),
        { variant: 'error' }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await CommentService.addComment(contract.id, newComment);
      setNewComment('');
      setCommentError('');
      await loadComments();
      onUpdate?.();
      enqueueSnackbar('Comment added successfully', { variant: 'success' });
    } catch (error) {
      const errorMsg = getErrorMessage(error, 'Error adding comment');
      setCommentError(errorMsg);
      enqueueSnackbar(errorMsg, { variant: 'error' });
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await CommentService.deleteComment(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
      onUpdate?.();
      enqueueSnackbar('Comment deleted successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(
        getErrorMessage(error, 'Error deleting comment'),
        { variant: 'error' }
      );
    }
  };

  return (
    <Dialog open={!!contract} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Comments for {contract?.reference}
        <IconButton 
          onClick={loadComments} 
          sx={{ position: 'absolute', right: 56, top: 8 }}
          disabled={isLoading}
        >
          <Refresh />
        </IconButton>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : (
          <List sx={{ mb: 2 }}>
            {comments?.map(comment => (
              <ListItem
                key={comment.id}
                secondaryAction={
                  <IconButton 
                    onClick={() => handleDelete(comment.id)} 
                    edge="end"
                    disabled={isLoading}
                    color="error"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={comment.comment}
                  secondary={
                    <Box component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Chip
                        label={comment.author?.name}
                        size="small"
                        component="span"
                        sx={{ borderRadius: 1, fontSize: '0.75rem', height: '24px' }}
                      />
                      <Typography component="span" variant="body2" color="text.secondary">
                        {dayjs(comment.created_at).format('DD.MM.YYYY HH:mm')}
                      </Typography>
                    </Box>
                  }
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>
            ))}
          </List>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            minRows={2}
            variant="outlined"
            label="New comment"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
              if (commentError) setCommentError('');
            }}
            sx={{ mt: 2 }}
            error={!!commentError || newComment.length > 1000}
            helperText={
              commentError 
                ? commentError 
                : (newComment.length > 1000 
                    ? 'Comment cannot exceed 1000 characters' 
                    : `${newComment.length}/1000`
                  )
            }
            FormHelperTextProps={{
              sx: { 
                color: (commentError || newComment.length > 1000) ? 'error.main' : 'text.secondary',
                textAlign: 'right',
                mx: 0
              }
            }}
          />
          <DialogActions sx={{ px: 0 }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Send />}
              disabled={!newComment.trim() || newComment.length > 1000}
              sx={{ mt: 2 }}
            >
              Add Comment
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

ContractCommentsModal.propTypes = {
  contract: PropTypes.shape({
    id: PropTypes.number.isRequired,
    reference: PropTypes.string.isRequired,
    created_by: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
};

ContractCommentsModal.defaultProps = {
  contract: null,
  onUpdate: () => {},
};

export default ContractCommentsModal;
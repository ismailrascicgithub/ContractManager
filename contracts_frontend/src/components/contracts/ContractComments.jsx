import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, Typography, IconButton, CircularProgress
} from '@mui/material';
import { CommentService } from '../../services/commentService';
import { useAuth } from '../../contexts/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

export default function ContractComments({ open, contract, onClose, onUpdate }) {
  const { user } = useAuth();
  const [state, setState] = useState({
    comments: [],
    newComment: '',
    loading: true,
    editingComment: null
  });

  const loadComments = async () => {
    try {
      const { data } = await CommentService.getForContract(contract.id);
      setState(prev => ({ ...prev, comments: data, loading: false }));
    } catch (error) {
      console.error('Error loading comments:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (state.editingComment) {
        await CommentService.update(state.editingComment.id, { comment: state.newComment });
      } else {
        await CommentService.create(contract.id, { comment: state.newComment });
      }
      setState(prev => ({ ...prev, newComment: '', editingComment: null }));
      loadComments();
      onUpdate();
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  useEffect(() => { if (open) loadComments(); }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Comments for {contract?.reference}</DialogTitle>
      <DialogContent dividers>
        {state.loading ? <CircularProgress /> : (
          state.comments.map(comment => (
            <Box key={comment.id} sx={{ mb: 2, p: 2, border: '1px solid #eee' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle2">
                  {comment.author.name} - {dayjs(comment.created_at).format('DD.MM.YYYY HH:mm')}
                </Typography>
                {comment.created_by === user.id && (
                  <Box>
                    <IconButton onClick={() => setState(prev => ({
                      ...prev,
                      editingComment: comment,
                      newComment: comment.comment
                    }))}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => CommentService.delete(comment.id).then(loadComments)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Typography>{comment.comment}</Typography>
            </Box>
          ))
        )}
        <TextField
          fullWidth
          multiline
          rows={3}
          value={state.newComment}
          onChange={e => setState(prev => ({ ...prev, newComment: e.target.value }))}
          label="New comment"
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!state.newComment.trim()}>
          {state.editingComment ? 'Update Comment' : 'Add Comment'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
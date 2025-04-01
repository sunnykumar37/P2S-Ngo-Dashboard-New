import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Badge,
} from '@mui/material';
import {
  Send as SendIcon,
  Add as AddIcon,
  Notifications as NotificationsIcon,
  Message as MessageIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';

function Communication() {
  const [openMessage, setOpenMessage] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [updateText, setUpdateText] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [messageCategory, setMessageCategory] = useState('all');
  const [starredMessages, setStarredMessages] = useState([]);

  // Mock data for messages with categories
  const messages = [
    {
      id: 1,
      sender: 'John Doe',
      message: 'Thank you for your support! The food distribution was successful.',
      timestamp: '2 hours ago',
      avatar: 'JD',
      category: 'volunteers',
      starred: false,
    },
    {
      id: 2,
      sender: 'Jane Smith',
      message: 'We need more volunteers for the upcoming event.',
      timestamp: '5 hours ago',
      avatar: 'JS',
      category: 'events',
      starred: false,
    },
    {
      id: 3,
      sender: 'Admin',
      message: 'Monthly report is ready for review.',
      timestamp: '1 day ago',
      avatar: 'AD',
      category: 'reports',
      starred: true,
    },
  ];

  // Mock data for updates with categories
  const updates = [
    {
      id: 1,
      title: 'Food Distribution Event',
      content: 'Join us this weekend for our monthly food distribution event.',
      timestamp: '1 day ago',
      category: 'events',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Volunteer Training',
      content: 'New volunteer training session scheduled for next week.',
      timestamp: '2 days ago',
      category: 'training',
      priority: 'medium',
    },
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCategoryChange = (event) => {
    setMessageCategory(event.target.value);
  };

  const handleStarMessage = (messageId) => {
    setStarredMessages((prev) => {
      const isStarred = prev.includes(messageId);
      return isStarred
        ? prev.filter((id) => id !== messageId)
        : [...prev, messageId];
    });
  };

  const filteredMessages = messages.filter((message) => {
    if (messageCategory === 'all') return true;
    if (messageCategory === 'starred') return starredMessages.includes(message.id);
    return message.category === messageCategory;
  });

  const handleOpenMessage = () => {
    setOpenMessage(true);
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
    setMessageText('');
  };

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setUpdateText('');
  };

  const handleSendMessage = () => {
    // Add message sending logic here
    console.log('Sending message:', messageText);
    handleCloseMessage();
  };

  const handlePostUpdate = () => {
    // Add update posting logic here
    console.log('Posting update:', updateText);
    handleCloseUpdate();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Communication</Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MessageIcon />}
            onClick={handleOpenMessage}
            sx={{ mr: 2 }}
          >
            New Message
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<NotificationsIcon />}
            onClick={handleOpenUpdate}
          >
            Post Update
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Messages" />
                <Tab label="Updates" />
              </Tabs>
            </Box>

            {selectedTab === 0 && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FormControl sx={{ minWidth: 120, mr: 2 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={messageCategory}
                      label="Category"
                      onChange={handleCategoryChange}
                    >
                      <MenuItem value="all">All Messages</MenuItem>
                      <MenuItem value="starred">Starred</MenuItem>
                      <MenuItem value="volunteers">Volunteers</MenuItem>
                      <MenuItem value="events">Events</MenuItem>
                      <MenuItem value="reports">Reports</MenuItem>
                    </Select>
                  </FormControl>
                  <Chip
                    icon={<FilterIcon />}
                    label={`${filteredMessages.length} messages`}
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                <List>
                  {filteredMessages.map((message, index) => (
                    <React.Fragment key={message.id}>
                      <ListItem
                        alignItems="flex-start"
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={() => handleStarMessage(message.id)}
                          >
                            {starredMessages.includes(message.id) ? (
                              <StarIcon color="primary" />
                            ) : (
                              <StarBorderIcon />
                            )}
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>{message.avatar}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography component="span" variant="subtitle1">
                                {message.sender}
                              </Typography>
                              <Chip
                                label={message.category}
                                size="small"
                                sx={{ ml: 1 }}
                              />
                            </Box>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {message.message}
                              </Typography>
                              <Typography
                                component="span"
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: 'block', mt: 1 }}
                              >
                                {message.timestamp}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      {index < filteredMessages.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </>
            )}

            {selectedTab === 1 && (
              <>
                {updates.map((update) => (
                  <Card key={update.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="h6" gutterBottom>
                          {update.title}
                        </Typography>
                        <Chip
                          label={update.priority}
                          color={update.priority === 'high' ? 'error' : 'warning'}
                          size="small"
                        />
                      </Box>
                      <Typography color="text.secondary" gutterBottom>
                        {update.content}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {update.timestamp}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Send Bulk Message
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Send a message to all volunteers or specific groups
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<MessageIcon />}
                      sx={{ mt: 2 }}
                    >
                      Start
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Schedule Update
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Schedule an update to be posted at a specific time
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<NotificationsIcon />}
                      sx={{ mt: 2 }}
                    >
                      Schedule
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openMessage} onClose={handleCloseMessage} maxWidth="sm" fullWidth>
        <DialogTitle>New Message</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={messageCategory}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="volunteers">Volunteers</MenuItem>
              <MenuItem value="events">Events</MenuItem>
              <MenuItem value="reports">Reports</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMessage}>Cancel</Button>
          <Button onClick={handleSendMessage} variant="contained" color="primary" startIcon={<SendIcon />}>
            Send
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUpdate} onClose={handleCloseUpdate} maxWidth="sm" fullWidth>
        <DialogTitle>Post Update</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value="medium"
              label="Priority"
              onChange={() => {}}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Cancel</Button>
          <Button onClick={handlePostUpdate} variant="contained" color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Communication; 
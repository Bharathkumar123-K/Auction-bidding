import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, CardMedia, Chip, IconButton } from '@mui/material';
import { SimpleButton, SimpleTitle, SimpleText } from './SimpleComponents';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';

const EnhancedAuctionCard = ({
  item,
  isAdmin = false,
  isFavorite = false,
  onToggleFavorite,
  onViewBids,
  onRemoveItem,
  getTimeRemaining,
  isAuctionEnded
}) => {
  const timeRemaining = getTimeRemaining(item.end_time);
  const auctionEnded = isAuctionEnded(item.end_time);

  return (
    <Box
      className="auction-card"
      sx={{
        height: '520px !important',
        width: '100% !important',
        maxWidth: '380px !important',
        margin: '0 auto !important',
        display: 'flex !important',
        flexDirection: 'column !important',
      }}
    >
      {/* Image Container */}
      <Box
        className="card-image-container"
        sx={{
          height: '220px !important',
          width: '100% !important',
          flexShrink: 0,
        }}
      >
        {/* Favorite Button for Users */}
        {!isAdmin && (
          <IconButton
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(item._id);
            }}
            size="small"
          >
            <FavoriteIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}

        {/* Item Image */}
        {item.image_url ? (
          <CardMedia
            component="img"
            className="card-image"
            image={`http://localhost:5000/uploads/${item.image_url}`}
            alt={item.name}
          />
        ) : (
          <CardMedia
            component="img"
            className="card-image"
            image="https://via.placeholder.com/300x200?text=No+Image&bg=f0f0f0&color=999"
            alt="No image available"
          />
        )}

        {/* Time Remaining Chip */}
        <Chip
          label={timeRemaining}
          icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
          className={`time-chip ${auctionEnded ? 'ended' : ''}`}
          size="small"
        />
      </Box>

      {/* Card Content */}
      <Box
        className="card-content"
        sx={{
          height: '300px !important',
          padding: '20px !important',
          display: 'flex !important',
          flexDirection: 'column !important',
          justifyContent: 'space-between !important',
        }}
      >
        {/* Title */}
        <SimpleTitle
          variant="h6"
          className="card-title"
          sx={{
            height: '3.5rem !important',
            overflow: 'hidden !important',
            display: '-webkit-box !important',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            fontSize: '1.25rem !important',
            fontWeight: 600,
            lineHeight: 1.4,
            marginBottom: '8px !important',
          }}
        >
          {item.name}
        </SimpleTitle>

        {/* Description */}
        <SimpleText
          className="card-description"
          sx={{
            height: '4.5rem !important',
            overflow: 'hidden !important',
            display: '-webkit-box !important',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            fontSize: '0.9rem !important',
            lineHeight: 1.5,
            marginBottom: '16px !important',
          }}
        >
          {item.description}
        </SimpleText>

        {/* Price Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocalOfferIcon sx={{ mr: 1, color: '#667eea', fontSize: 20 }} />
          <SimpleText className="card-price">
            ${item.current_price.toFixed(2)}
          </SimpleText>
        </Box>

        {/* Admin Status Chip */}
        {isAdmin && (
          <Box sx={{ mb: 2 }}>
            <Chip
              label={auctionEnded ? 'Ended' : 'Active'}
              color={auctionEnded ? 'error' : 'success'}
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        )}

        {/* Action Buttons */}
        <Box sx={{ mt: 'auto' }}>
          {isAdmin ? (
            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
              <SimpleButton
                onClick={() => onViewBids(item._id, item.name)}
                variant="outlined"
                size="small"
                startIcon={<VisibilityIcon />}
                className="enhanced-button"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  }
                }}
              >
                View Bids
              </SimpleButton>

              {auctionEnded && (
                <SimpleButton
                  onClick={() => onRemoveItem(item.id, item.name)}
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<RemoveCircleIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                    color: 'white',
                    border: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #ee5a52 0%, #ff6b6b 100%)',
                    }
                  }}
                >
                  Remove
                </SimpleButton>
              )}

              <SimpleButton
                component={RouterLink}
                to={`/items/${item.id}`}
                variant="contained"
                size="small"
                endIcon={<SearchIcon />}
                className="enhanced-button"
              >
                Details
              </SimpleButton>
            </Box>
          ) : (
            <SimpleButton
              component={RouterLink}
              to={`/items/${item.id}`}
              variant="contained"
              fullWidth
              endIcon={<SearchIcon />}
              className="enhanced-button"
            >
              View Details
            </SimpleButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EnhancedAuctionCard;

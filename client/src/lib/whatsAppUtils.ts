import React from 'react';
import { WAHAChat, WAHAMessage } from './wahaApiClient';
import { Phone } from 'lucide-react';

// Format phone number for display
export function formatPhoneNumber(phoneNumber: string): string {
  // Extract phone number from chat ID (e.g., "123456789@c.us" -> "123456789")
  const numberOnly = phoneNumber.split('@')[0];

  // Add "+" prefix if it doesn't have one
  if (!numberOnly.startsWith('+')) {
    return `+${numberOnly}`;
  }

  return numberOnly;
}

// Get display name for a chat
export function getChatDisplayName(chat: WAHAChat): string {
  if (chat.name) return chat.name;

  // Use phone number if no name is available
  return formatPhoneNumber(chat.id);
}

// Generate avatar initials from name or phone number
export function getAvatarInitials(chat: WAHAChat): string {
  if (chat.name) {
    // Get first letter of each word, up to 2 letters
    const words = chat.name.split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    } else {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
  } else {
    // Use last 2 digits of phone number
    const phoneNumber = chat.id.split('@')[0];
    return phoneNumber.substring(phoneNumber.length - 2).toUpperCase();
  }
}

// Format timestamp to human-readable relative time
export function formatRelativeTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  if (diffSec < 60) {
    return 'Just now';
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  } else if (diffDay < 7) {
    return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  } else {
    // Format as date
    return date.toLocaleDateString();
  }
}

// Format timestamp to time string (e.g., "14:30")
export function formatMessageTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Format date for message groups
export function formatMessageDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
}

// Group messages by date
export function groupMessagesByDate(messages: WAHAMessage[]): [string, WAHAMessage[]][] {
  const groups: Record<string, WAHAMessage[]> = {};

  messages.forEach(message => {
    const date = formatMessageDate(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });

  return Object.entries(groups);
}

import React from 'react';

export function linkifyText(text: string) {
  if (!text) return text;

  // Regular expressions for detection
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
  const phoneRegex = /(\+?[\d\s()-]{10,})/g;

  // Split text into parts that match regexes and those that don't
  const parts = [];
  let lastIndex = 0;

  // Handle URLs
  text.replace(urlRegex, (match, url, index) => {
    if (index > lastIndex) {
      parts.push(text.substring(lastIndex, index));
    }
    parts.push({ type: 'url', content: url });
    lastIndex = index + match.length;
    return match;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  // Process email and phone in the non-URL parts
  const processedParts = parts.map(part => {
    if (typeof part === 'string') {
      // Process emails
      const emailParts = [];
      let lastEmailIndex = 0;

      part.replace(emailRegex, (match, email, index) => {
        if (index > lastEmailIndex) {
          emailParts.push(part.substring(lastEmailIndex, index));
        }
        emailParts.push({ type: 'email', content: email });
        lastEmailIndex = index + match.length;
        return match;
      });

      if (lastEmailIndex < part.length) {
        emailParts.push(part.substring(lastEmailIndex));
      }

      // Process phone numbers in the non-email parts
      return emailParts.map(emailPart => {
        if (typeof emailPart === 'string') {
          const phoneParts = [];
          let lastPhoneIndex = 0;

          emailPart.replace(phoneRegex, (match, phone, index) => {
            if (index > lastPhoneIndex) {
              phoneParts.push(emailPart.substring(lastPhoneIndex, index));
            }
            phoneParts.push({ type: 'phone', content: phone });
            lastPhoneIndex = index + match.length;
            return match;
          });

          if (lastPhoneIndex < emailPart.length) {
            phoneParts.push(emailPart.substring(lastPhoneIndex));
          }

          return phoneParts;
        }
        return emailPart;
      }).flat();
    }
    return part;
  }).flat();

  // Convert parts to React elements
  return processedParts.map((part, index) => {
    if (typeof part === 'string') {
      return part;
    } else if (part.type === 'url') {
      return (
        <a
          key={index}
          href={part.content}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {part.content}
        </a>
      );
    } else if (part.type === 'email') {
      return (
        <a
          key={index}
          href={`mailto:${part.content}`}
          className="text-purple-600 hover:underline"
        >
          {part.content}
        </a>
      );
    } else if (part.type === 'phone') {
      return (
        <a
          key={index}
          href={`tel:${part.content.replace(/\s/g, '')}`}
          className="text-green-600 hover:underline"
        >
          {part.content}
        </a>
      );
    }
    return null;
  });
}

// Format file size (e.g., "1.5 MB")
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Get message status label from ack number
export function getMessageStatusLabel(ack?: number): string {
  switch (ack) {
    case 0:
      return 'Pending';
    case 1:
      return 'Sent';
    case 2:
      return 'Delivered';
    case 3:
      return 'Read';
    default:
      return 'Unknown';
  }
}

// Get message status icon from ack number
export function getMessageStatusIcon(ack?: number): string {
  switch (ack) {
    case 0:
      return '🕒'; // Pending
    case 1:
      return '✓'; // Sent
    case 2:
      return '✓✓'; // Delivered
    case 3:
      return '✓✓'; // Read (should be blue in the UI)
    default:
      return '';
  }
}

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
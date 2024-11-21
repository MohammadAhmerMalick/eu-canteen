const notificationsData = (ids: { id: string }[]) => [
  {
    message: 'Update available: New version ready for download.',
    isRead: false,
    from: ids[0].id,
    to: ['general'],
  },
  {
    message: 'New message: You have a new message from Alex.',
    isRead: false,
    from: ids[0].id,
    to: ['general'],
  },
  {
    message: 'Payment confirmed: Your order has been successfully paid.',
    isRead: false,
    from: ids[0].id,
    to: ['general'],
  },
  {
    message: 'Low battery: Please plug in your device soon.',
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message: 'Reminder: Meeting with the team in 15 minutes.',
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message: "Goal achieved: Congrats! You've reached 10,000 steps.",
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message: 'Weather alert: Rain is expected in your area today.',
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message: 'New friend request: Sam wants to connect with you.',
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message: 'Storage full: Please free up some space.',
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message: 'Promotion: 20% off your next purchase, today only!',
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message: 'Appointment reminder: Dentist appointment tomorrow at 10 AM.',
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message: 'Security alert: Unusual login detected from a new device.',
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message: 'Update successful: Your profile information has been updated.',
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message: 'Event starting soon: Webinar begins in 30 minutes.',
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message: 'System reboot required: Restart to apply the latest updates.',
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message:
      'Goal missed: You didn’t reach your daily activity target. Try again tomorrow!',
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message: 'New review: Someone left feedback on your recent post.',
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message: 'Subscription renewal: Your plan renews in 3 days.',
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message: "Location saved: You've bookmarked this place.",
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
  {
    message: "Achievement unlocked: You've reached Level 5! Keep going!",
    isRead: false,
    from: ids[0].id,
    to: [ids[0].id],
  },
]

export default notificationsData

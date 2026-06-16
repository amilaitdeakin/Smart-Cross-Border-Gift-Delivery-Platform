# Admin Dashboard Quick Start Guide

## Access Points

### Main Admin Routes
- **Dashboard**: `/admin` - Overview and statistics
- **All Orders**: `/admin/orders` - Complete orders list
- **Pending Orders**: `/admin/orders?status=pending`
- **Processing Orders**: `/admin/orders?status=processing`
- **In Transit**: `/admin/orders?status=out_for_delivery`
- **Delivered**: `/admin/orders?status=delivered`

## Key Features at a Glance

### Dashboard Statistics
```
├─ Total Orders: Quick count of all orders
├─ Pending: Orders awaiting processing
├─ In Progress: Processing + out_for_delivery combined
├─ Delivered: Successfully completed orders
└─ Revenue: Total AUD amount from all orders
```

### Orders List
```
Features:
├─ Full text search (order #, customer name, email)
├─ Status filtering dropdown
├─ Real-time statistics cards
├─ Sortable order table
└─ Direct links to order details
```

### Order Details Page
```
Left Section (Information):
├─ Sender Information
├─ Recipient Information  
├─ Delivery Address
└─ Order Items with pricing

Right Section (Actions):
├─ Order Status Update Panel
├─ Payment Status Update Panel
├─ Delivery Status Update Panel
└─ Order Summary with breakdown
```

## Common Workflows

### Workflow 1: Marking Order as Processing
1. Go to `/admin/orders`
2. Search for or find the order
3. Click "View"
4. In "Update Order Status" panel, select "processing"
5. Optionally add notes
6. Click "Update Status"
7. Notification appears confirming update

### Workflow 2: Updating Delivery Status
1. Open order details
2. In "Update Delivery Status" panel, select delivery stage
3. Add delivery notes if needed (optional)
4. Click "Update Delivery"
5. Success notification displays

### Workflow 3: Marking Payment as Complete
1. Open order details
2. In "Update Payment Status" panel, select "completed"
3. Click "Update Payment"
4. Payment status updates immediately

### Workflow 4: Searching and Filtering
1. Go to `/admin/orders`
2. Use search box to find by:
   - Order number (GIFT-XXXXXX)
   - Customer name
   - Customer email
3. Use status dropdown to filter
4. Results update in real-time

## Status Transitions

### Order Status Flow
```
pending → processing → out_for_delivery → delivered
   ↓
cancelled/refunded (alternative paths)
```

### Delivery Status Flow
```
assigned → picked_up → in_transit → out_for_delivery → delivered
                                             ↓
                                           failed
```

### Payment Status Flow
```
pending → completed
   ↓
failed → (retry from pending)
```

## UI Elements Guide

### Status Badge Colors
- **Yellow**: Pending status (awaiting action)
- **Blue**: Processing status (in progress)
- **Purple**: In-transit (out for delivery)
- **Green**: Completed/delivered (success)
- **Red**: Failed/cancelled (error state)
- **Gray**: Other states

### Data Displayed

**Orders Table Columns**:
- Order # - Unique order identifier
- Customer - Recipient name + phone
- Amount - Total in AUD
- Order Status - Current status
- Payment - Payment completion status
- Date - Order creation date
- Action - View button

**Order Details**:
- Sender/Recipient contact info
- Complete delivery address
- All order items with quantities
- Individual prices and totals
- Delivery partner info (if assigned)
- Payment details summary

## Tips & Best Practices

1. **Always add notes when updating status** - Helps track reason for changes
2. **Use search before scrolling** - Faster for large order lists
3. **Check payment status before marking delivered** - Ensure payment is complete
4. **Update delivery status as package moves** - Keeps customer informed
5. **Review order summary** - Verify amounts before confirming delivery

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Order not appearing in search | Try searching by order number only |
| Status update fails | Check browser console for errors, retry |
| No data loading | Verify internet connection, refresh page |
| Delivery panel missing | Order may not have assigned delivery yet |

## API Endpoints (Technical Reference)

### Query Endpoints
```
POST /api/trpc/order.getAllOrders
POST /api/trpc/order.getOrderById
```

### Mutation Endpoints
```
POST /api/trpc/order.updateOrderStatus
POST /api/trpc/order.updatePaymentStatus
POST /api/trpc/order.updateDeliveryStatus
```

## Performance Notes

- Dashboard loads up to 1000 orders for statistics
- Orders list shows 50 items per page
- Search is case-insensitive
- Filters apply after search
- Toast notifications auto-dismiss after 5 seconds
- Real-time updates available via refetch

## Keyboard Shortcuts

- `/admin` - Direct to dashboard
- `/admin/orders` - Direct to all orders
- `Ctrl+K` - May open command palette for navigation (if implemented)

---

**Last Updated**: 2026-06-16
**Dashboard Version**: 1.0.0

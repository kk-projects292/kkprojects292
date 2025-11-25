// Order history and PDF export functionality

// Get all orders from local storage
function getOrders() {
    try {
        return JSON.parse(localStorage.getItem('ecommerce_orders') || '[]');
    } catch (e) {
        return [];
    }
}

// Export all orders to PDF
function exportOrdersToPDF() {
    const orders = getOrders();
    
    if (orders.length === 0) {
        alert('No orders to export.');
        return;
    }

    // Check if jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
        alert('PDF library not loaded. Please refresh the page and try again.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set font
    doc.setFontSize(16);
    doc.text('Order History - ShopHub', 14, 20);
    
    // Set smaller font for table
    doc.setFontSize(10);
    
    let yPosition = 35;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 14;
    const lineHeight = 7;
    
    // Table headers
    const headers = ['Order ID', 'Date', 'Customer', 'Email', 'Phone', 'Total'];
    const colWidths = [35, 30, 30, 40, 25, 20];
    let xPosition = margin;
    
    // Draw header row
    doc.setFillColor(102, 126, 234);
    doc.rect(margin, yPosition - 5, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    
    headers.forEach((header, index) => {
        doc.text(header, xPosition, yPosition);
        xPosition += colWidths[index];
    });
    
    yPosition += lineHeight + 3;
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    
    // Sort orders by date (newest first)
    const sortedOrders = orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    
    // Add order rows
    sortedOrders.forEach((order, index) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 20;
        }
        
        const orderDate = new Date(order.orderDate).toLocaleDateString();
        const orderId = order.orderId.substring(0, 12); // Truncate for display
        const customerName = order.customerName.length > 15 ? order.customerName.substring(0, 15) + '...' : order.customerName;
        const email = order.email.length > 20 ? order.email.substring(0, 20) + '...' : order.email;
        const phone = order.phone;
        const total = '$' + order.totalPrice.toFixed(2);
        
        xPosition = margin;
        const rowData = [orderId, orderDate, customerName, email, phone, total];
        
        rowData.forEach((data, colIndex) => {
            doc.text(data, xPosition, yPosition);
            xPosition += colWidths[colIndex];
        });
        
        yPosition += lineHeight;
        
        // Add items details below each order
        if (yPosition > pageHeight - 50) {
            doc.addPage();
            yPosition = 20;
        }
        
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        order.items.forEach(item => {
            const itemText = `  - ${item.name} (Qty: ${item.quantity}) - $${(item.quantity * item.price).toFixed(2)}`;
            if (itemText.length > 80) {
                doc.text(itemText.substring(0, 80), margin + 5, yPosition);
                yPosition += lineHeight - 2;
                doc.text(itemText.substring(80), margin + 10, yPosition);
            } else {
                doc.text(itemText, margin + 5, yPosition);
            }
            yPosition += lineHeight - 2;
        });
        
        yPosition += 3;
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        // Draw separator line
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition, margin + 180, yPosition);
        yPosition += 5;
    });
    
    // Add summary at the end
    if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
    }
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Summary', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    
    doc.text(`Total Orders: ${totalOrders}`, margin, yPosition);
    yPosition += lineHeight;
    doc.text(`Total Revenue: $${totalRevenue.toFixed(2)}`, margin, yPosition);
    
    // Save PDF
    doc.save('shopKing-orders.pdf');
}

// Make functions available globally
window.getOrders = getOrders;
window.exportOrdersToPDF = exportOrdersToPDF;




import {
    FaUsers,
    FaDollarSign,
    FaShoppingCart,
    FaBox,
    FaPlus,
    FaArrowUp,
    FaArrowDown,
    FaChartBar
} from 'react-icons/fa';

const Home = ({ sidebarCollapsed }) => {
    const stats = [
        {
            title: 'Total Users',
            value: '12,486',
            icon: FaUsers,
            color: '#3498db',
            change: '+12%',
            isPositive: true
        },
        {
            title: 'Revenue',
            value: '$89,432',
            icon: FaDollarSign,
            color: '#2ecc71',
            change: '+8%',
            isPositive: true
        },
        {
            title: 'Orders',
            value: '1,426',
            icon: FaShoppingCart,
            color: '#f39c12',
            change: '+15%',
            isPositive: true
        },
        {
            title: 'Products',
            value: '324',
            icon: FaBox,
            color: '#e74c3c',
            change: '-3%',
            isPositive: false
        },
    ];

    const recentActivities = [
        { action: 'New user registered', time: '2 minutes ago', type: 'user' },
        { action: 'Order #1234 completed', time: '15 minutes ago', type: 'order' },
        { action: 'Product inventory updated', time: '1 hour ago', type: 'product' },
        { action: 'Payment received', time: '2 hours ago', type: 'payment' },
    ];

    return (
        <div
            className="main-content"
            style={{
                marginLeft: sidebarCollapsed ? '70px' : '250px',
                paddingTop: '80px',
                transition: 'margin-left 0.3s ease-in-out',
                minHeight: 'calc(100vh - 60px)',
                backgroundColor: '#f8f9fa'
            }}
        >
            <div className="container-fluid px-4">
                {/* Page Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="mb-1" style={{ color: '#2c3e50', fontWeight: '600' }}>
                            Dashboard Overview
                        </h2>
                        <p className="text-muted mb-0">Welcome back! Here's what's happening today.</p>
                    </div>
                    <button
                        className="btn btn-primary d-flex align-items-center"
                        style={{
                            backgroundColor: '#3498db',
                            borderColor: '#3498db',
                            borderRadius: '8px',
                            padding: '10px 20px'
                        }}
                    >
                        <FaPlus className="me-2" />
                        Add New
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="row mb-4">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={index} className="col-xl-3 col-md-6 mb-4">
                                <div
                                    className="card border-0 shadow-sm h-100"
                                    style={{
                                        borderRadius: '12px',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                                    }}
                                >
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <h6 className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>
                                                    {stat.title}
                                                </h6>
                                                <h3 className="mb-1" style={{ color: '#2c3e50', fontWeight: '700' }}>
                                                    {stat.value}
                                                </h3>
                                                <div className="d-flex align-items-center">
                                                    {stat.isPositive ? (
                                                        <FaArrowUp className="text-success me-1" style={{ fontSize: '0.8rem' }} />
                                                    ) : (
                                                        <FaArrowDown className="text-danger me-1" style={{ fontSize: '0.8rem' }} />
                                                    )}
                                                    <span
                                                        className={stat.isPositive ? 'text-success' : 'text-danger'}
                                                        style={{ fontSize: '0.85rem', fontWeight: '500' }}
                                                    >
                                                        {stat.change}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className="rounded-circle d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    backgroundColor: `${stat.color}20`,
                                                    color: stat.color
                                                }}
                                            >
                                                <IconComponent style={{ fontSize: '1.5rem' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Recent Activities and Quick Actions */}
                <div className="row">
                    <div className="col-lg-8 mb-4">
                        <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                            <div className="card-header bg-white border-0 p-4">
                                <h5 className="mb-0" style={{ color: '#2c3e50', fontWeight: '600' }}>
                                    Recent Activities
                                </h5>
                            </div>
                            <div className="card-body p-0">
                                <div className="list-group list-group-flush">
                                    {recentActivities.map((activity, index) => (
                                        <div key={index} className="list-group-item border-0 px-4 py-3">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="rounded-circle me-3"
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        backgroundColor: '#3498db20',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <FaUsers style={{ color: '#3498db', fontSize: '1rem' }} />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <p className="mb-1" style={{ color: '#2c3e50', fontWeight: '500' }}>
                                                        {activity.action}
                                                    </p>
                                                    <small className="text-muted">{activity.time}</small>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 mb-4">
                        <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                            <div className="card-header bg-white border-0 p-4">
                                <h5 className="mb-0" style={{ color: '#2c3e50', fontWeight: '600' }}>
                                    Quick Actions
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <div className="d-grid gap-3">
                                    <button className="btn btn-outline-primary text-start" style={{ borderRadius: '8px' }}>
                                        <FaUsers className="me-2" />
                                        Manage Users
                                    </button>
                                    <button className="btn btn-outline-success text-start" style={{ borderRadius: '8px' }}>
                                        <FaBox className="me-2" />
                                        Add Product
                                    </button>
                                    <button className="btn btn-outline-warning text-start" style={{ borderRadius: '8px' }}>
                                        <FaShoppingCart className="me-2" />
                                        View Orders
                                    </button>
                                    <button className="btn btn-outline-info text-start" style={{ borderRadius: '8px' }}>
                                        <FaChartBar className="me-2" />
                                        Analytics
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
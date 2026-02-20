
import React, { useState } from 'react';

// --- ROLES and STATUS_MAP ---
const ROLES = {
  ADMIN: 'Admin',
  EXECUTIVE: 'Executive',
  MANAGER: 'Manager',
  EMPLOYEE: 'Employee',
};

const STATUS_MAP = {
  PENDING: { label: 'Pending', colorVar: 'var(--status-pending)' },
  APPROVED: { label: 'Approved', colorVar: 'var(--status-approved)' },
  REJECTED: { label: 'Rejected', colorVar: 'var(--status-rejected)' },
  DRAFT: { label: 'Draft', colorVar: 'var(--status-draft)' },
  ACTIVE: { label: 'Active', colorVar: 'var(--status-active)' },
  COMPLETED: { label: 'Completed', colorVar: 'var(--status-completed)' },
  OVERDUE: { label: 'Overdue', colorVar: 'var(--status-overdue)' },
  NEW: { label: 'New', colorVar: 'var(--status-new)' },
};

// --- DUMMY DATA ---
const DUMMY_USERS = [
  { id: 'usr1', name: 'Alice Johnson', role: ROLES.ADMIN, email: 'alice.j@pulsepoint.com', department: 'HR' },
  { id: 'usr2', name: 'Bob Williams', role: ROLES.EXECUTIVE, email: 'bob.w@pulsepoint.com', department: 'Leadership' },
  { id: 'usr3', name: 'Charlie Davis', role: ROLES.MANAGER, email: 'charlie.d@pulsepoint.com', department: 'Engineering' },
  { id: 'usr4', name: 'Diana Miller', role: ROLES.EMPLOYEE, email: 'diana.m@pulsepoint.com', department: 'Marketing' },
  { id: 'usr5', name: 'Eve Brown', role: ROLES.EMPLOYEE, email: 'eve.b@pulsepoint.com', department: 'HR' },
  { id: 'usr6', name: 'Frank White', role: ROLES.MANAGER, email: 'frank.w@pulsepoint.com', department: 'Sales' },
  { id: 'usr7', name: 'Grace Green', role: ROLES.EXECUTIVE, email: 'grace.g@pulsepoint.com', department: 'Operations' },
  { id: 'usr8', name: 'Heidi Black', role: ROLES.EMPLOYEE, email: 'heidi.b@pulsepoint.com', department: 'Engineering' },
];

const DUMMY_SURVEYS = [
  {
    id: 's1',
    title: 'Q1 Employee Satisfaction',
    description: 'A comprehensive look into employee satisfaction for Q1 2024.',
    status: 'ACTIVE',
    createdBy: 'Alice Johnson',
    department: 'HR',
    startDate: '2024-01-15',
    endDate: '2024-01-31',
    responses: 120,
    totalEmployees: 200,
    anonymity: true,
    workflow: [
      { stage: 'Drafted', date: '2024-01-01', status: 'completed' },
      { stage: 'Approved by HR', date: '2024-01-10', status: 'completed' },
      { stage: 'Launched', date: '2024-01-15', status: 'active' },
      { stage: 'Analyzing Results', date: null, status: 'pending' },
      { stage: 'Report Generated', date: null, status: 'pending' },
    ],
    slaDue: '2024-03-01',
    isSLABreached: false,
    fileAttachment: { name: 'Q1_Survey_Questions.pdf', url: '#' },
  },
  {
    id: 's2',
    title: 'Team Collaboration Feedback',
    description: 'Gathering insights on inter-team collaboration dynamics.',
    status: 'DRAFT',
    createdBy: 'Alice Johnson',
    department: 'Engineering',
    startDate: '2024-03-01',
    endDate: '2024-03-15',
    responses: 0,
    totalEmployees: 50,
    anonymity: true,
    workflow: [
      { stage: 'Drafted', date: '2024-02-10', status: 'active' },
      { stage: 'Approved by HR', date: null, status: 'pending' },
      { stage: 'Launched', date: null, status: 'pending' },
      { stage: 'Analyzing Results', date: null, status: 'pending' },
      { stage: 'Report Generated', date: null, status: 'pending' },
    ],
    slaDue: '2024-02-28',
    isSLABreached: true,
    fileAttachment: null,
  },
  {
    id: 's3',
    title: 'Work-Life Balance Pulse',
    description: 'A quick pulse check on current work-life balance perceptions.',
    status: 'COMPLETED',
    createdBy: 'Alice Johnson',
    department: 'All',
    startDate: '2023-11-01',
    endDate: '2023-11-07',
    responses: 180,
    totalEmployees: 200,
    anonymity: false,
    workflow: [
      { stage: 'Drafted', date: '2023-10-15', status: 'completed' },
      { stage: 'Approved by HR', date: '2023-10-20', status: 'completed' },
      { stage: 'Launched', date: '2023-11-01', status: 'completed' },
      { stage: 'Analyzing Results', date: '2023-11-15', status: 'completed' },
      { stage: 'Report Generated', date: '2023-11-20', status: 'completed' },
    ],
    slaDue: '2023-11-25',
    isSLABreached: false,
    fileAttachment: { name: 'WLB_Report_2023.pdf', url: '#' },
  },
  {
    id: 's4',
    title: 'Manager Effectiveness Review',
    description: 'Feedback for managers to improve leadership skills.',
    status: 'PENDING', // Pending HR approval before launch
    createdBy: 'Alice Johnson',
    department: 'HR',
    startDate: '2024-04-01',
    endDate: '2024-04-15',
    responses: 0,
    totalEmployees: 200,
    anonymity: true,
    workflow: [
      { stage: 'Drafted', date: '2024-03-01', status: 'completed' },
      { stage: 'Approved by HR', date: null, status: 'active' }, // Waiting for approval
      { stage: 'Launched', date: null, status: 'pending' },
      { stage: 'Analyzing Results', date: null, status: 'pending' },
      { stage: 'Report Generated', date: null, status: 'pending' },
    ],
    slaDue: '2024-03-25',
    isSLABreached: false,
    fileAttachment: null,
  },
];

const DUMMY_FEEDBACK = [
  {
    id: 'f1',
    surveyId: 's1',
    employeeId: 'usr4',
    title: 'Positive Q1 Experience',
    sentiment: 'Positive',
    status: 'APPROVED',
    comment: 'The Q1 survey was well-structured and allowed for honest feedback. I feel heard.',
    date: '2024-01-20',
    tags: ['communication', 'culture'],
  },
  {
    id: 'f2',
    surveyId: 's1',
    employeeId: 'usr8',
    title: 'Suggestion for Improvement',
    sentiment: 'Neutral',
    status: 'PENDING',
    comment: 'It would be great if there were more open-ended questions to provide detailed suggestions.',
    date: '2024-01-22',
    tags: ['survey design'],
  },
  {
    id: 'f3',
    surveyId: 's3',
    employeeId: 'usr5',
    title: 'Concern about Workload',
    sentiment: 'Negative',
    status: 'REJECTED', // Maybe for being off-topic or inappropriate (simulated)
    comment: 'My workload is extremely heavy, leading to burnout. This survey needs to address real issues.',
    date: '2023-11-05',
    tags: ['workload', 'burnout'],
  },
  {
    id: 'f4',
    surveyId: 's1',
    employeeId: 'usr4',
    title: 'Great initiative!',
    sentiment: 'Positive',
    status: 'APPROVED',
    comment: 'Appreciate the company taking these surveys seriously. Good work!',
    date: '2024-01-21',
    tags: ['engagement'],
  },
  {
    id: 'f5',
    surveyId: 's3',
    employeeId: 'usr3',
    title: 'WLB is critical',
    sentiment: 'Neutral',
    status: 'APPROVED',
    comment: 'Good to see focus on work-life balance. It is a critical aspect for employee well-being.',
    date: '2023-11-03',
    tags: ['well-being'],
  },
];

const DUMMY_ACTION_PLANS = [
  {
    id: 'ap1',
    title: 'Improve Cross-Departmental Communication',
    ownerId: 'usr3',
    relatedFeedbackId: 'f2',
    status: 'ACTIVE',
    dueDate: '2024-06-30',
    description: 'Implement bi-weekly cross-functional sync meetings.',
    progress: '50%',
  },
  {
    id: 'ap2',
    title: 'Address Workload Concerns',
    ownerId: 'usr1',
    relatedFeedbackId: 'f3',
    status: 'PENDING',
    dueDate: '2024-03-31',
    description: 'Conduct a workload assessment across all departments.',
    progress: '10%',
  },
];

const DUMMY_AUDIT_LOGS = [
  { id: 'log1', timestamp: '2024-03-10T10:00:00Z', userId: 'usr1', userName: 'Alice Johnson', action: 'Survey s1 status updated to ACTIVE', role: ROLES.ADMIN, objectId: 's1' },
  { id: 'log2', timestamp: '2024-03-09T15:30:00Z', userId: 'usr3', userName: 'Charlie Davis', action: 'Accessed Dashboard', role: ROLES.MANAGER, objectId: null },
  { id: 'log3', timestamp: '2024-03-08T09:00:00Z', userId: 'usr1', userName: 'Alice Johnson', action: 'Created Survey s2', role: ROLES.ADMIN, objectId: 's2' },
  { id: 'log4', timestamp: '2024-03-07T11:45:00Z', userId: 'usr4', userName: 'Diana Miller', action: 'Submitted Feedback f1', role: ROLES.EMPLOYEE, objectId: 'f1' },
  { id: 'log5', timestamp: '2024-03-06T14:00:00Z', userId: 'usr2', userName: 'Bob Williams', action: 'Viewed Executive Dashboard', role: ROLES.EXECUTIVE, objectId: null },
];

const getCurrentUser = (id) => DUMMY_USERS.find(user => user.id === id);

// --- Component Definitions ---

const Breadcrumbs = ({ path, navigate }) => (
  <div className="breadcrumbs">
    {path.map((item, index) => (
      <span key={item.label}>
        {(index > 0) ? ' / ' : ''}
        {(item.onClick)
          ? <a href="#" onClick={(e) => { e.preventDefault(); item.onClick(); }}>{item.label}</a>
          : <span>{item.label}</span>
        }
      </span>
    ))}
  </div>
);

const Card = ({ title, subtitle, status, children, onClick, footer, additionalInfo }) => {
  const statusInfo = STATUS_MAP[status?.toUpperCase()] || { label: status, colorVar: 'var(--color-accent)' };
  return (
    <div className="card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="card-header">
        <div>
          <h3 className="card-title">{title}</h3>
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
        {status && (
          <span className={`card-status status-${status?.toUpperCase()}`} style={{ backgroundColor: statusInfo.colorVar }}>
            {statusInfo.label}
          </span>
        )}
      </div>
      <div className="card-body">
        {children}
      </div>
      {additionalInfo && <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-dark)', marginTop: 'var(--spacing-sm)' }}>{additionalInfo}</p>}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

const EmptyState = ({ title, description, icon, ctaLabel, onCtaClick }) => (
  <div className="empty-state">
    <div className="empty-state__icon">{icon || '👀'}</div>
    <h3 className="empty-state__title">{title}</h3>
    <p className="empty-state__description">{description}</p>
    {onCtaClick && <button className="primary" onClick={onCtaClick}>{ctaLabel}</button>}
  </div>
);

const ChartPlaceholder = ({ type, title }) => (
  <div className="chart-container">
    <span>{title} ({type} Chart)</span>
  </div>
);

const WorkflowTracker = ({ workflowStages }) => {
  return (
    <div className="workflow-tracker">
      {workflowStages?.map((stage, index) => (
        <div key={index} className={`workflow-stage ${stage.status} ${stage.isSLABreached ? 'overdue' : ''}`}>
          <div className="workflow-stage-dot">
            {stage.status === 'completed' && '✓'}
            {stage.status === 'active' && '●'}
          </div>
          <span>{stage.stage}</span>
          {stage.date && <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent)' }}>{new Date(stage.date).toLocaleDateString()}</span>}
        </div>
      ))}
    </div>
  );
};

const CreateSurveyFormScreen = ({ navigate, userRole }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    startDate: '',
    endDate: '',
    anonymity: true,
    fileAttachment: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: (type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)),
    }));
    // Clear error for the field when user starts typing
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is mandatory.';
    if (!formData.description) newErrors.description = 'Description is mandatory.';
    if (!formData.department) newErrors.department = 'Department is mandatory.';
    if (!formData.startDate) newErrors.startDate = 'Start Date is mandatory.';
    if (!formData.endDate) newErrors.endDate = 'End Date is mandatory.';
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End Date must be after Start Date.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Survey created successfully (simulated)!');
      // In a real app, this would dispatch an action to add survey data
      navigate('SURVEYS_LIST');
    } else {
      alert('Please correct the form errors.');
    }
  };

  if (userRole !== ROLES.ADMIN) {
    return (
      <div className="detail-page">
        <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Access Denied</h2>
        <p>You do not have permission to create surveys.</p>
        <button className="primary" onClick={() => navigate('DASHBOARD')}>Go to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Breadcrumbs path={[{ label: 'Surveys', onClick: () => navigate('SURVEYS_LIST') }, { label: 'Create New Survey' }]} navigate={navigate} />
      <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Create New Survey</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Survey Title <span style={{ color: 'var(--color-danger)' }}>*</span></label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description <span style={{ color: 'var(--color-danger)' }}>*</span></label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4"></textarea>
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="department">Target Department <span style={{ color: 'var(--color-danger)' }}>*</span></label>
          <select id="department" name="department" value={formData.department} onChange={handleChange}>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="All">All Departments</option>
          </select>
          {errors.department && <p className="error-message">{errors.department}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date <span style={{ color: 'var(--color-danger)' }}>*</span></label>
          <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
          {errors.startDate && <p className="error-message">{errors.startDate}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date <span style={{ color: 'var(--color-danger)' }}>*</span></label>
          <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
          {errors.endDate && <p className="error-message">{errors.endDate}</p>}
        </div>
        <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
          <input type="checkbox" id="anonymity" name="anonymity" checked={formData.anonymity} onChange={handleChange} style={{ width: 'auto', marginRight: 'var(--spacing-sm)' }} />
          <label htmlFor="anonymity" style={{ marginBottom: 0 }}>Ensure Anonymity</label>
        </div>
        <div className="form-group">
          <label htmlFor="fileAttachment">Upload Supporting Document (Optional)</label>
          <input type="file" id="fileAttachment" name="fileAttachment" onChange={handleChange} />
        </div>
        <button type="submit" className="primary" style={{ marginRight: 'var(--spacing-md)' }}>Create Survey</button>
        <button type="button" className="secondary" onClick={() => navigate('SURVEYS_LIST')}>Cancel</button>
      </form>
    </div>
  );
};


const DashboardScreen = ({ navigate, userRole }) => {
  const [filterOpen, setFilterOpen] = useState(false);

  const getKpiCards = () => {
    switch (userRole) {
      case ROLES.ADMIN:
        return (
          <>
            <ChartPlaceholder type="Bar" title="Overall Morale Score" />
            <ChartPlaceholder type="Line" title="Burnout Risk Trend" />
            <Card
              title="Surveys in Draft"
              subtitle={`${DUMMY_SURVEYS.filter(s => s.status === 'DRAFT').length} pending approval`}
              onClick={() => navigate('SURVEYS_LIST', { status: 'DRAFT' })}
              additionalInfo="Review and launch for feedback."
            >
              <p>Quickly approve or modify draft surveys.</p>
            </Card>
            <Card
              title="Pending Action Plans"
              subtitle={`${DUMMY_ACTION_PLANS.filter(ap => ap.status === 'PENDING').length} awaiting assignment`}
              onClick={() => navigate('ACTION_PLANS_LIST', { status: 'PENDING' })}
              additionalInfo="Ensure timely follow-up on critical feedback."
            >
              <p>Action items derived from employee feedback.</p>
            </Card>
          </>
        );
      case ROLES.EXECUTIVE:
        return (
          <>
            <ChartPlaceholder type="Line" title="Overall Sentiment Trend" />
            <ChartPlaceholder type="Donut" title="Turnover Risk Distribution" />
            <ChartPlaceholder type="Gauge" title="Engagement Score (Live)" />
            <Card
              title="High-Level KPI Overview"
              subtitle="Strategic insights across the organization"
              onClick={() => navigate('REPORTS')}
              additionalInfo="Drill down into detailed reports and dashboards."
            >
              <p>Executive summary of key engagement metrics.</p>
            </Card>
          </>
        );
      case ROLES.MANAGER:
        return (
          <>
            <ChartPlaceholder type="Bar" title="My Team Sentiment Score" />
            <Card
              title="Team Feedback to Review"
              subtitle={`${DUMMY_FEEDBACK.filter(f => f.status === 'PENDING').length} new items`}
              onClick={() => navigate('FEEDBACK_LIST', { team: 'MyTeam', status: 'PENDING' })}
              additionalInfo="Address team concerns promptly."
            >
              <p>Direct feedback from your team members.</p>
            </Card>
            <Card
              title="Active Action Plans"
              subtitle={`${DUMMY_ACTION_PLANS.filter(ap => ap.ownerId === 'usr3' && ap.status === 'ACTIVE').length} in progress`}
              onClick={() => navigate('ACTION_PLANS_LIST', { owner: 'usr3' })}
              additionalInfo="Monitor and update progress on initiatives."
            >
              <p>Track initiatives linked to team improvements.</p>
            </Card>
            <ChartPlaceholder type="Line" title="Team Burnout Trends" />
          </>
        );
      case ROLES.EMPLOYEE:
        return (
          <>
            <Card
              title="Pending Surveys"
              subtitle={`${DUMMY_SURVEYS.filter(s => s.status === 'ACTIVE').length} to complete`}
              onClick={() => navigate('SURVEYS_LIST', { status: 'ACTIVE' })}
              additionalInfo="Your voice helps shape our culture."
            >
              <p>Participate in active surveys.</p>
            </Card>
            <Card
              title="My Submitted Feedback"
              subtitle={`${DUMMY_FEEDBACK.filter(f => f.employeeId === 'usr4').length} items`}
              onClick={() => navigate('FEEDBACK_LIST', { employeeId: 'usr4' })}
              additionalInfo="View status and responses to your contributions."
            >
              <p>Review the feedback you've provided.</p>
            </Card>
            <Card
              title="Peer Recognition"
              subtitle="Send a shout-out!"
              onClick={() => alert('Navigate to Peer Recognition feature (Not implemented)')}
              additionalInfo="Recognize your colleagues' contributions."
            >
              <p>Acknowledge great work from your peers.</p>
            </Card>
            <Card
              title="Anonymous Feedback"
              subtitle="Share your thoughts freely"
              onClick={() => alert('Navigate to Anonymous Feedback submission (Not implemented)')}
              additionalInfo="Provide suggestions without revealing your identity."
            >
              <p>Contribute to a transparent culture.</p>
            </Card>
          </>
        );
      default:
        return <p>Select a role to view dashboard content.</p>;
    }
  };

  const recentActivities = [
    { id: 'act1', text: 'New survey "Q1 Employee Satisfaction" launched.', screen: 'SURVEY_DETAIL', params: { id: 's1' }, date: '2024-03-10' },
    { id: 'act2', text: 'Feedback submitted for "Work-Life Balance Pulse".', screen: 'FEEDBACK_LIST', date: '2024-03-09' },
    { id: 'act3', text: 'Action plan "Improve Cross-Departmental Communication" updated.', screen: 'ACTION_PLANS_LIST', date: '2024-03-08' },
    { id: 'act4', text: 'Your draft survey "Team Collaboration Feedback" requires review.', screen: 'SURVEY_DETAIL', params: { id: 's2' }, date: '2024-03-07' },
  ];

  const quickActions = [
    { label: 'Create New Survey', onClick: () => navigate('CREATE_SURVEY'), roles: [ROLES.ADMIN] },
    { label: 'Review Pending Feedback', onClick: () => navigate('FEEDBACK_LIST', { status: 'PENDING' }), roles: [ROLES.ADMIN, ROLES.MANAGER] },
    { label: 'View All Surveys', onClick: () => navigate('SURVEYS_LIST'), roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.ADMIN, ROLES.EXECUTIVE] },
    { label: 'Submit Anonymous Feedback', onClick: () => alert('Open Anonymous Feedback Form'), roles: [ROLES.EMPLOYEE] },
  ];

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 style={{ display: 'flex', alignItems: 'center' }}>
          Welcome back, {getCurrentUser('usr1')?.name}!
          <span className="live-pulse-indicator" style={{ marginLeft: 'var(--spacing-sm)' }}></span>
        </h1>
        <button className="primary" onClick={() => setFilterOpen(true)}>Dashboard Filters</button>
      </div>

      <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Key Metrics</h2>
      <div className="grid-4" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        {getKpiCards()}
      </div>

      <div className="grid-2">
        <Card title="Recent Activities" subtitle="Your latest interactions" style={{ minHeight: '300px' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {recentActivities.map(activity => (
              <li key={activity.id} style={{ marginBottom: 'var(--spacing-sm)', paddingBottom: 'var(--spacing-sm)', borderBottom: '1px solid var(--color-border)', cursor: 'pointer' }} onClick={() => activity.screen && navigate(activity.screen, activity.params)}>
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-dark)', fontWeight: 'var(--font-weight-medium)' }}>{activity.text}</span>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent)', marginTop: 'var(--spacing-xs)' }}>{activity.date}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Quick Actions" subtitle="Jump right in" style={{ minHeight: '300px' }}>
          <div className="flex-col gap-md">
            {quickActions
              .filter(action => action.roles.includes(userRole))
              .map((action, index) => (
                <button key={index} className="primary" onClick={action.onClick} style={{ width: '100%' }}>{action.label}</button>
              ))}
          </div>
        </Card>
      </div>

      {filterOpen && (
        <>
          <div className="overlay" onClick={() => setFilterOpen(false)}></div>
          <div className="sidebar-filters open">
            <div className="sidebar-filters__header">
              <h3>Filters</h3>
              <button className="text-only" onClick={() => setFilterOpen(false)}>X</button>
            </div>
            <div className="sidebar-filters__content">
              {/* Filter components would go here */}
              <div className="form-group">
                <label htmlFor="filterStatus">Status</label>
                <select id="filterStatus">
                  <option value="">All</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="filterDepartment">Department</label>
                <select id="filterDepartment">
                  <option value="">All</option>
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>
              <button className="primary" style={{ marginTop: 'var(--spacing-md)' }} onClick={() => { alert('Applying filters (simulated)'); setFilterOpen(false); }}>Apply Filters</button>
              <button className="text-only" style={{ marginTop: 'var(--spacing-sm)' }} onClick={() => { alert('Clearing filters (simulated)'); setFilterOpen(false); }}>Clear Filters</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const SurveysListScreen = ({ navigate, userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortKey, setSortKey] = useState('startDate');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  const filteredSurveys = DUMMY_SURVEYS
    .filter(survey =>
      survey?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      survey?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
    .filter(survey => filterStatus === '' || survey?.status === filterStatus)
    .sort((a, b) => {
      const aVal = a?.[sortKey];
      const bVal = b?.[sortKey];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return 0;
    });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilterStatus(e.target.value);
  const handleSortChange = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const showCreateButton = (userRole === ROLES.ADMIN);

  return (
    <div className="main-content">
      <Breadcrumbs path={[{ label: 'Surveys' }]} navigate={navigate} />
      <div className="page-header">
        <h1>Surveys</h1>
        {showCreateButton && <button className="primary" onClick={() => navigate('CREATE_SURVEY')}>Create New Survey</button>}
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
        <input
          type="text"
          placeholder="Search surveys..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ flexGrow: 1, padding: 'var(--spacing-sm)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)' }}
        />
        <select value={filterStatus} onChange={handleFilterChange} style={{ padding: 'var(--spacing-sm)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)' }}>
          <option value="">All Statuses</option>
          {Object.keys(STATUS_MAP).map(statusKey => (
            <option key={statusKey} value={statusKey}>{STATUS_MAP[statusKey].label}</option>
          ))}
        </select>
        <button onClick={() => handleSortChange('title')} className="secondary">Sort by Title {sortKey === 'title' && (sortOrder === 'asc' ? '▲' : '▼')}</button>
        <button onClick={() => handleSortChange('startDate')} className="secondary">Sort by Date {sortKey === 'startDate' && (sortOrder === 'asc' ? '▲' : '▼')}</button>
        <button className="secondary" onClick={() => alert('Export to Excel/PDF (simulated)')}>Export</button>
      </div>

      {filteredSurveys.length === 0 ? (
        <EmptyState
          title="No Surveys Found"
          description="It looks like there are no surveys matching your criteria. Try adjusting your filters or search terms."
          icon="📝"
          ctaLabel={showCreateButton ? 'Create First Survey' : null}
          onCtaClick={showCreateButton ? () => navigate('CREATE_SURVEY') : null}
        />
      ) : (
        <div className="grid-3">
          {filteredSurveys.map(survey => (
            <Card
              key={survey.id}
              title={survey.title}
              subtitle={`Department: ${survey.department}`}
              status={survey.status}
              onClick={() => navigate('SURVEY_DETAIL', { id: survey.id })}
              footer={`Created by ${survey.createdBy} on ${survey.startDate}`}
            >
              <p>{survey.description?.substring(0, 100)}...</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const SurveyDetailScreen = ({ navigate, params, userRole }) => {
  const survey = DUMMY_SURVEYS.find(s => s.id === params?.id);
  const relatedFeedback = DUMMY_FEEDBACK.filter(f => f.surveyId === params?.id);
  const relatedActionPlans = DUMMY_ACTION_PLANS.filter(ap => DUMMY_FEEDBACK.some(f => f.id === ap.relatedFeedbackId && f.surveyId === params?.id));

  const handleEdit = () => {
    alert('Edit Survey (simulated)!');
    // In a real app, navigate to an edit form for this survey
  };

  const handleApproveWorkflow = () => {
    alert('Workflow step approved (simulated)!');
    // In a real app, update the survey's workflow status
  };

  const showEditButton = (userRole === ROLES.ADMIN);
  const showApproveButton = (userRole === ROLES.ADMIN || userRole === ROLES.MANAGER) && (survey?.status === 'PENDING');

  if (!survey) {
    return (
      <div className="main-content">
        <Breadcrumbs path={[{ label: 'Surveys', onClick: () => navigate('SURVEYS_LIST') }, { label: 'Not Found' }]} navigate={navigate} />
        <EmptyState title="Survey Not Found" description="The survey you are looking for does not exist." ctaLabel="Back to Surveys" onCtaClick={() => navigate('SURVEYS_LIST')} />
      </div>
    );
  }

  const currentWorkflow = survey.workflow;
  const isSLAOverdue = survey.isSLABreached;
  const slaDueDate = new Date(survey.slaDue).toLocaleDateString();

  return (
    <div className="main-content">
      <Breadcrumbs path={[{ label: 'Surveys', onClick: () => navigate('SURVEYS_LIST') }, { label: survey.title }]} navigate={navigate} />
      <div className="detail-page">
        <div className="page-header" style={{ marginBottom: 'var(--spacing-md)' }}>
          <h1 style={{ marginBottom: 0 }}>{survey.title}</h1>
          <div className="flex-row gap-md">
            {showApproveButton && <button className="primary" onClick={handleApproveWorkflow}>Approve Launch</button>}
            {showEditButton && <button className="secondary" onClick={handleEdit}>Edit Survey</button>}
          </div>
        </div>
        <p className="text-accent" style={{ marginBottom: 'var(--spacing-lg)' }}>{survey.description}</p>

        <div className="detail-section">
          <h2>Workflow Status</h2>
          {isSLAOverdue && (
            <div style={{ backgroundColor: 'var(--color-danger)', color: 'var(--color-text-light)', padding: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-sm)', marginBottom: 'var(--spacing-md)', fontWeight: 'var(--font-weight-medium)' }}>
              SLA BREACHED: Due Date was {slaDueDate}.
            </div>
          )}
          <WorkflowTracker workflowStages={currentWorkflow} />
        </div>

        <div className="detail-section">
          <h2>Survey Details</h2>
          <div className="detail-grid">
            <div>
              <span className="detail-label">Status</span>
              <span className="detail-value">{STATUS_MAP[survey.status]?.label || survey.status}</span>
            </div>
            <div>
              <span className="detail-label">Department</span>
              <span className="detail-value">{survey.department}</span>
            </div>
            <div>
              <span className="detail-label">Created By</span>
              <span className="detail-value">{survey.createdBy}</span>
            </div>
            <div>
              <span className="detail-label">Start Date</span>
              <span className="detail-value">{new Date(survey.startDate).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="detail-label">End Date</span>
              <span className="detail-value">{new Date(survey.endDate).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="detail-label">Anonymity</span>
              <span className="detail-value">{survey.anonymity ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div>
              <span className="detail-label">Responses / Total</span>
              <span className="detail-value">{survey.responses} / {survey.totalEmployees}</span>
            </div>
            {survey.fileAttachment && (
              <div>
                <span className="detail-label">Attachment</span>
                <a href={survey.fileAttachment.url} target="_blank" rel="noopener noreferrer" className="detail-value">{survey.fileAttachment.name}</a>
              </div>
            )}
          </div>
        </div>

        <div className="detail-section">
          <h2>Related Feedback ({relatedFeedback.length})</h2>
          {relatedFeedback.length === 0 ? (
            <p className="text-accent">No feedback submitted for this survey yet.</p>
          ) : (
            <div className="grid-2">
              {relatedFeedback.map(feedback => (
                <Card
                  key={feedback.id}
                  title={feedback.title}
                  subtitle={`Sentiment: ${feedback.sentiment}`}
                  status={feedback.status}
                  onClick={() => navigate('FEEDBACK_DETAIL', { id: feedback.id })}
                >
                  <p>{feedback.comment?.substring(0, 70)}...</p>
                  <p style={{ marginTop: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', color: 'var(--color-accent)' }}>
                    From {DUMMY_USERS.find(u => u.id === feedback.employeeId)?.name || 'Anonymous'}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>

        {(userRole === ROLES.ADMIN || userRole === ROLES.MANAGER) && (
          <div className="detail-section">
            <h2>Related Action Plans ({relatedActionPlans.length})</h2>
            {relatedActionPlans.length === 0 ? (
              <p className="text-accent">No action plans derived from this survey's feedback yet.</p>
            ) : (
              <div className="grid-2">
                {relatedActionPlans.map(plan => (
                  <Card
                    key={plan.id}
                    title={plan.title}
                    subtitle={`Due: ${new Date(plan.dueDate).toLocaleDateString()}`}
                    status={plan.status}
                    onClick={() => alert(`Navigate to Action Plan Detail for ${plan.title}`)} // Placeholder for AP detail
                  >
                    <p>{plan.description?.substring(0, 70)}...</p>
                    <p style={{ marginTop: 'var(--spacing-sm)', fontSize: 'var(--font-size-xs)', color: 'var(--color-accent)' }}>
                      Progress: {plan.progress}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const FeedbackListScreen = ({ navigate, userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSentiment, setFilterSentiment] = useState('');

  const filteredFeedback = DUMMY_FEEDBACK
    .filter(feedback =>
      feedback?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      feedback?.comment?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
    .filter(feedback => filterStatus === '' || feedback?.status === filterStatus)
    .filter(feedback => filterSentiment === '' || feedback?.sentiment === filterSentiment);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterStatusChange = (e) => setFilterStatus(e.target.value);
  const handleFilterSentimentChange = (e) => setFilterSentiment(e.target.value);

  const canCreateActionPlan = (userRole === ROLES.ADMIN || userRole === ROLES.MANAGER);

  return (
    <div className="main-content">
      <Breadcrumbs path={[{ label: 'Feedback' }]} navigate={navigate} />
      <div className="page-header">
        <h1>Employee Feedback</h1>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
        <input
          type="text"
          placeholder="Search feedback..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ flexGrow: 1, padding: 'var(--spacing-sm)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)' }}
        />
        <select value={filterStatus} onChange={handleFilterStatusChange} style={{ padding: 'var(--spacing-sm)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)' }}>
          <option value="">All Statuses</option>
          {Object.keys(STATUS_MAP).map(statusKey => (
            <option key={statusKey} value={statusKey}>{STATUS_MAP[statusKey].label}</option>
          ))}
        </select>
        <select value={filterSentiment} onChange={handleFilterSentimentChange} style={{ padding: 'var(--spacing-sm)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)' }}>
          <option value="">All Sentiments</option>
          <option value="Positive">Positive</option>
          <option value="Neutral">Neutral</option>
          <option value="Negative">Negative</option>
        </select>
      </div>

      {filteredFeedback.length === 0 ? (
        <EmptyState title="No Feedback Found" description="No feedback entries match your current filters." icon="💬" />
      ) : (
        <div className="grid-3">
          {filteredFeedback.map(feedback => {
            const survey = DUMMY_SURVEYS.find(s => s.id === feedback?.surveyId);
            const employee = DUMMY_USERS.find(u => u.id === feedback?.employeeId);
            return (
              <Card
                key={feedback.id}
                title={feedback.title}
                subtitle={`Survey: ${survey?.title || 'N/A'} | Sentiment: ${feedback.sentiment}`}
                status={feedback.status}
                onClick={() => navigate('FEEDBACK_DETAIL', { id: feedback.id })}
                footer={`From: ${employee?.name || 'Anonymous'} on ${feedback.date}`}
              >
                <p>{feedback.comment?.substring(0, 100)}...</p>
                {canCreateActionPlan && (
                  <button className="text-only" onClick={(e) => { e.stopPropagation(); alert(`Create Action Plan for Feedback ID: ${feedback.id}`); }} style={{ alignSelf: 'flex-start', marginTop: 'var(--spacing-sm)' }}>
                    Create Action Plan
                  </button>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

const FeedbackDetailScreen = ({ navigate, params, userRole }) => {
  const feedback = DUMMY_FEEDBACK.find(f => f.id === params?.id);
  const survey = DUMMY_SURVEYS.find(s => s.id === feedback?.surveyId);
  const employee = DUMMY_USERS.find(u => u.id === feedback?.employeeId);

  const handleUpdateStatus = (newStatus) => {
    alert(`Updating feedback status to ${newStatus} (simulated)!`);
    // In a real app, update feedback status
  };

  const handleCreateActionPlan = () => {
    alert(`Creating action plan for this feedback (simulated)!`);
    // In a real app, navigate to action plan creation form pre-filled with feedback ID
  };

  if (!feedback) {
    return (
      <div className="main-content">
        <Breadcrumbs path={[{ label: 'Feedback', onClick: () => navigate('FEEDBACK_LIST') }, { label: 'Not Found' }]} navigate={navigate} />
        <EmptyState title="Feedback Not Found" description="The feedback entry you are looking for does not exist." ctaLabel="Back to Feedback" onCtaClick={() => navigate('FEEDBACK_LIST')} />
      </div>
    );
  }

  const showActionButtons = (userRole === ROLES.ADMIN || userRole === ROLES.MANAGER);

  return (
    <div className="main-content">
      <Breadcrumbs path={[{ label: 'Feedback', onClick: () => navigate('FEEDBACK_LIST') }, { label: feedback.title }]} navigate={navigate} />
      <div className="detail-page">
        <div className="page-header" style={{ marginBottom: 'var(--spacing-md)' }}>
          <h1 style={{ marginBottom: 0 }}>{feedback.title}</h1>
          {showActionButtons && (
            <div className="flex-row gap-md">
              {feedback.status === 'PENDING' && <button className="primary" onClick={() => handleUpdateStatus('APPROVED')}>Approve</button>}
              {feedback.status === 'PENDING' && <button className="secondary" onClick={() => handleUpdateStatus('REJECTED')}>Reject</button>}
              <button className="primary" onClick={handleCreateActionPlan}>Create Action Plan</button>
            </div>
          )}
        </div>
        <p className="text-accent" style={{ marginBottom: 'var(--spacing-lg)' }}>Sentiment: <span style={{ fontWeight: 'var(--font-weight-bold)' }}>{feedback.sentiment}</span></p>

        <div className="detail-section">
          <h2>Details</h2>
          <div className="detail-grid">
            <div>
              <span className="detail-label">Status</span>
              <span className="detail-value">{STATUS_MAP[feedback.status]?.label || feedback.status}</span>
            </div>
            <div>
              <span className="detail-label">Related Survey</span>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('SURVEY_DETAIL', { id: survey?.id }); }} className="detail-value">{survey?.title || 'N/A'}</a>
            </div>
            <div>
              <span className="detail-label">Submitted By</span>
              <span className="detail-value">{employee?.name || 'Anonymous'}</span>
            </div>
            <div>
              <span className="detail-label">Submission Date</span>
              <span className="detail-value">{new Date(feedback.date).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="detail-label">Tags</span>
              <span className="detail-value">{feedback.tags?.join(', ') || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2>Comment</h2>
          <p className="detail-value">{feedback.comment}</p>
        </div>
      </div>
    </div>
  );
};

const UsersListScreen = ({ navigate, userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const filteredUsers = DUMMY_USERS
    .filter(user =>
      user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      user?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
    .filter(user => filterRole === '' || user?.role === filterRole);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterRoleChange = (e) => setFilterRole(e.target.value);

  if (userRole !== ROLES.ADMIN) {
    return (
      <div className="main-content">
        <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Access Denied</h2>
        <p>You do not have permission to view all users.</p>
        <button className="primary" onClick={() => navigate('DASHBOARD')}>Go to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="main-content">
      <Breadcrumbs path={[{ label: 'Users' }]} navigate={navigate} />
      <div className="page-header">
        <h1>Users</h1>
        <button className="primary" onClick={() => alert('Add New User (simulated)')}>Add New User</button>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ flexGrow: 1, padding: 'var(--spacing-sm)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)' }}
        />
        <select value={filterRole} onChange={handleFilterRoleChange} style={{ padding: 'var(--spacing-sm)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)' }}>
          <option value="">All Roles</option>
          {Object.keys(ROLES).map(roleKey => (
            <option key={roleKey} value={ROLES[roleKey]}>{ROLES[roleKey]}</option>
          ))}
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <EmptyState title="No Users Found" description="No user entries match your current filters." icon="🧑‍💻" />
      ) : (
        <div className="grid-3">
          {filteredUsers.map(user => (
            <Card
              key={user.id}
              title={user.name}
              subtitle={`Role: ${user.role}`}
              status={'ACTIVE'} // Assuming users are active by default for card display
              onClick={() => navigate('USER_DETAIL', { id: user.id })}
              footer={`Department: ${user.department}`}
            >
              <p>{user.email}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const UserDetailScreen = ({ navigate, params, userRole }) => {
  const user = DUMMY_USERS.find(u => u.id === params?.id);

  const handleEditUser = () => {
    alert(`Editing user ${user?.name} (simulated)!`);
  };

  if (!user) {
    return (
      <div className="main-content">
        <Breadcrumbs path={[{ label: 'Users', onClick: () => navigate('USERS_LIST') }, { label: 'Not Found' }]} navigate={navigate} />
        <EmptyState title="User Not Found" description="The user you are looking for does not exist." ctaLabel="Back to Users" onCtaClick={() => navigate('USERS_LIST')} />
      </div>
    );
  }

  const showEditButton = (userRole === ROLES.ADMIN || (userRole === ROLES.EMPLOYEE && params?.id === 'usr4')); // Employee can edit their own profile if it's usr4

  return (
    <div className="main-content">
      <Breadcrumbs path={[{ label: 'Users', onClick: () => navigate('USERS_LIST') }, { label: user.name }]} navigate={navigate} />
      <div className="detail-page">
        <div className="page-header" style={{ marginBottom: 'var(--spacing-md)' }}>
          <h1 style={{ marginBottom: 0 }}>{user.name}</h1>
          {showEditButton && <button className="secondary" onClick={handleEditUser}>Edit Profile</button>}
        </div>
        <p className="text-accent" style={{ marginBottom: 'var(--spacing-lg)' }}>{user.email}</p>

        <div className="detail-section">
          <h2>User Information</h2>
          <div className="detail-grid">
            <div>
              <span className="detail-label">Role</span>
              <span className="detail-value">{user.role}</span>
            </div>
            <div>
              <span className="detail-label">Department</span>
              <span className="detail-value">{user.department}</span>
            </div>
            {/* Add more user details as needed */}
          </div>
        </div>

        {userRole === ROLES.ADMIN && (
          <div className="detail-section">
            <h2>Audit Log for User ({DUMMY_AUDIT_LOGS.filter(log => log.userId === user.id).length})</h2>
            {DUMMY_AUDIT_LOGS.filter(log => log.userId === user.id).length === 0 ? (
              <p className="text-accent">No audit logs found for this user.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {DUMMY_AUDIT_LOGS.filter(log => log.userId === user.id).map(log => (
                  <li key={log.id} style={{ marginBottom: 'var(--spacing-sm)', paddingBottom: 'var(--spacing-sm)', borderBottom: '1px dashed var(--color-border)' }}>
                    <p style={{ fontSize: 'var(--font-size-sm)' }}>
                      <span className="text-bold">{log.action}</span> on {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const AuditLogsScreen = ({ navigate, userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const filteredLogs = DUMMY_AUDIT_LOGS
    .filter(log =>
      log?.userName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      log?.action?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      log?.objectId?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
    .filter(log => filterRole === '' || log?.role === filterRole);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterRoleChange = (e) => setFilterRole(e.target.value);

  if (userRole !== ROLES.ADMIN && userRole !== ROLES.EXECUTIVE) { // Example: Only Admin/Executive can view full logs
    return (
      <div className="main-content">
        <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Access Denied</h2>
        <p>You do not have permission to view audit logs.</p>
        <button className="primary" onClick={() => navigate('DASHBOARD')}>Go to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="main-content">
      <Breadcrumbs path={[{ label: 'Audit Logs' }]} navigate={navigate} />
      <div className="page-header">
        <h1>Audit Logs</h1>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
        <input
          type="text"
          placeholder="Search logs..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ flexGrow: 1, padding: 'var(--spacing-sm)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)' }}
        />
        <select value={filterRole} onChange={handleFilterRoleChange} style={{ padding: 'var(--spacing-sm)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)' }}>
          <option value="">All Roles</option>
          {Object.keys(ROLES).map(roleKey => (
            <option key={roleKey} value={ROLES[roleKey]}>{ROLES[roleKey]}</option>
          ))}
        </select>
      </div>

      {filteredLogs.length === 0 ? (
        <EmptyState title="No Audit Logs Found" description="No audit log entries match your current filters." icon="📜" />
      ) : (
        <div className="grid-2">
          {filteredLogs.map(log => (
            <Card
              key={log.id}
              title={log.action}
              subtitle={`User: ${log.userName} (${log.role})`}
              status={log.objectId ? 'NEW' : 'N/A'} // Using 'NEW' as a generic status for log cards
              onClick={() => alert(`View details for log entry: ${log.id}`)}
              footer={`Timestamp: ${new Date(log.timestamp).toLocaleString()}`}
            >
              <p>Object ID: {log.objectId || 'N/A'}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};


// --- Main App Component ---
function App() {
  const [view, setView] = useState({ screen: 'DASHBOARD', params: {} });
  const [userRole, setUserRole] = useState(ROLES.ADMIN); // Default role for demonstration

  const navigate = (screen, params = {}) => {
    setView({ screen, params });
  };

  const logout = () => {
    // Simulate logout
    alert('Logged out!');
    setUserRole(ROLES.EMPLOYEE); // Reset to employee or a login screen
    navigate('DASHBOARD');
  };

  const renderScreen = () => {
    switch (view.screen) {
      case 'DASHBOARD':
        return <DashboardScreen navigate={navigate} userRole={userRole} />;
      case 'SURVEYS_LIST':
        return <SurveysListScreen navigate={navigate} userRole={userRole} />;
      case 'SURVEY_DETAIL':
        return <SurveyDetailScreen navigate={navigate} params={view.params} userRole={userRole} />;
      case 'CREATE_SURVEY':
        return <CreateSurveyFormScreen navigate={navigate} userRole={userRole} />;
      case 'FEEDBACK_LIST':
        return <FeedbackListScreen navigate={navigate} userRole={userRole} />;
      case 'FEEDBACK_DETAIL':
        return <FeedbackDetailScreen navigate={navigate} params={view.params} userRole={userRole} />;
      case 'USERS_LIST':
        return <UsersListScreen navigate={navigate} userRole={userRole} />;
      case 'USER_DETAIL':
        return <UserDetailScreen navigate={navigate} params={view.params} userRole={userRole} />;
      case 'AUDIT_LOGS':
        return <AuditLogsScreen navigate={navigate} userRole={userRole} />;
      // Placeholder for other screens
      case 'REPORTS':
        return (
          <div className="main-content">
            <Breadcrumbs path={[{ label: 'Dashboard', onClick: () => navigate('DASHBOARD') }, { label: 'Reports' }]} navigate={navigate} />
            <h1>Reports & Analytics</h1>
            <p>This section would contain advanced reporting dashboards.</p>
            <div className="grid-2" style={{ marginTop: 'var(--spacing-lg)' }}>
              <ChartPlaceholder type="Bar" title="Department Performance" />
              <ChartPlaceholder type="Line" title="Engagement Score Over Time" />
            </div>
          </div>
        );
      case 'ACTION_PLANS_LIST':
          return (
            <div className="main-content">
              <Breadcrumbs path={[{ label: 'Dashboard', onClick: () => navigate('DASHBOARD') }, { label: 'Action Plans' }]} navigate={navigate} />
              <h1>Action Plans</h1>
              <p>List of action plans, showing progress and ownership.</p>
              <div className="grid-2">
                {DUMMY_ACTION_PLANS.map(plan => (
                  <Card
                    key={plan.id}
                    title={plan.title}
                    subtitle={`Owner: ${DUMMY_USERS.find(u => u.id === plan.ownerId)?.name || 'N/A'}`}
                    status={plan.status}
                    onClick={() => alert(`View Action Plan: ${plan.title}`)}
                    footer={`Due: ${new Date(plan.dueDate).toLocaleDateString()}`}
                  >
                    <p>Progress: {plan.progress}</p>
                  </Card>
                ))}
              </div>
            </div>
          );
      default:
        return (
          <div className="main-content">
            <Breadcrumbs path={[{ label: 'Dashboard', onClick: () => navigate('DASHBOARD') }]} navigate={navigate} />
            <h1>Page Not Found</h1>
            <p>The screen you requested does not exist.</p>
            <button className="primary" onClick={() => navigate('DASHBOARD')}>Go to Dashboard</button>
          </div>
        );
    }
  };

  const navItems = [
    { label: 'Dashboard', screen: 'DASHBOARD', roles: [ROLES.ADMIN, ROLES.EXECUTIVE, ROLES.MANAGER, ROLES.EMPLOYEE] },
    { label: 'Surveys', screen: 'SURVEYS_LIST', roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE] },
    { label: 'Feedback', screen: 'FEEDBACK_LIST', roles: [ROLES.ADMIN, ROLES.EXECUTIVE, ROLES.MANAGER] },
    { label: 'Users', screen: 'USERS_LIST', roles: [ROLES.ADMIN] },
    { label: 'Audit Logs', screen: 'AUDIT_LOGS', roles: [ROLES.ADMIN, ROLES.EXECUTIVE] }, // Example RBAC for audit logs
  ];

  const currentUser = getCurrentUser('usr1'); // Assuming 'usr1' is the logged-in user for initial demo

  return (
    <div className="app-container">
      <header className="header">
        <div className="header__left">
          <div className="header__logo">PulsePoint</div>
          <nav className="header__nav">
            {navItems.filter(item => item.roles.includes(userRole)).map(item => (
              <a
                key={item.screen}
                href="#"
                onClick={() => navigate(item.screen)}
                className={(view.screen === item.screen) ? 'active' : ''}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="header__right">
          <div className="global-search">
            <input type="text" placeholder="Global search..." />
          </div>
          <select className="role-selector" value={userRole} onChange={(e) => setUserRole(e.target.value)}>
            <option value={ROLES.ADMIN}>Switch to Admin</option>
            <option value={ROLES.EXECUTIVE}>Switch to Executive</option>
            <option value={ROLES.MANAGER}>Switch to Manager</option>
            <option value={ROLES.EMPLOYEE}>Switch to Employee</option>
          </select>
          <div className="header__user-avatar">{currentUser?.name?.charAt(0) || 'U'}</div>
          <button className="text-only" onClick={logout}>Logout</button>
        </div>
      </header>
      {renderScreen()}
    </div>
  );
}

export default App;
import { Locale } from '@/types/common';

const en: Locale['business'] = {
  global: {
    all: 'All',
    application: 'Application',
    setting: 'Setting',
    management: 'Management',
    project: 'Project',
    team: 'Team',
    user: 'User',
    projects: 'Projects',
    dynamics: 'Dynamics',
    recycles: 'Recycles',
    condition: 'Condition',
    conditions: 'Conditions',
    variables: 'Variables',
    functions: 'Functions',
    resources: 'Resources',
    packages: 'Packages',
    dashboard: 'Dashboard',
    contents: 'Contents',
    versions: 'Versions',
    add: 'Add',
    edit: 'Edit',
    type: 'Type',
    modify: 'Modify',
    update: 'Update',
    delete: 'Delete',
    view: 'View',
    operator: 'Operator',
    nameLabel: 'Name',
    creator: 'Creator',
    createTime: 'Create time',
    updateTime: 'Update time',
    actions: 'Actions',
    apply: 'Apply',
    save: 'Save',
    remove: 'Remove',
    search: 'Search',
    build: 'Build',
    locale: 'Locale',
    deleteMsg: 'Are you sure to delete',
    yes: 'Yes',
    no: 'No',
    terms: 'Terms',
    deleteFailMsg: 'Delete failed',
    host: 'Host',
    select: 'Select',
    height: 'Height',
    width: 'Width',
    label: 'Label',
    deleteSuccess: 'Delete succeed',
    publishSuccess: 'Publish succeed',
    cloneSuccess: 'Clone succeed',
    moveSuccess: 'Move succeed',
    updateSuccess: 'Update succeed',
    saveSuccess: 'Save succeed',
    commitSuccess: 'Commit succeed',
    revokeSuccess: 'Revoke succeed',
    deleteFailed: 'Delete failed',
    publishFailed: 'Publish failed',
    cloneFailed: 'Clone failed',
    moveFailed: 'Move failed',
    updateFailed: 'Update failed',
    saveFailed: 'Save failed',
    commitFailed: 'Commit failed',
    revokeFailed: 'Revoke failed',
    fetchListSuccess: 'Fetch list success',
    fetchListFailed: 'Fetch list failed',
    previewFailed: 'Preview failed',
    addFailed: 'Add failed',
    searchFailed: 'Search failed',
    nameError: 'Please input name',
    selectLocale: 'Please select locale',
    nameFormatInvalid: 'Please input valid name(0-9 a-z A-Z - _ @)',
  },
  workspace: {
    name: 'My Workspace',
  },
  organization: {
    name: 'Organization',
  },
  store: {
    buy: 'Add',
    name: 'Store',
    commit: 'Commit',
    revoke: 'Revoke',
    commitTitle: 'Are you sure commit?',
    commitMsg: 'This file will be sold on the store.',
    revokeTitle: 'Are you sure revoke?',
    revokeMsg: 'This file will be not sold on the store.',
    commitYes: 'Ok',
    commitNo: 'No',
    fetchResourceFailed: 'Fetch store resource failed',
    buyModalTitle: 'Application Selector',
    buySuccess: 'Buy succeed',
    buyFailed: 'Buy failed',
  },
  login: {
    loginOut: 'Logout',
    account: 'Account',
    password: 'Password',
    loginSuccess: 'Login succeed',
    loginFailed: 'Login failed',
    noOrganization: 'Please contact the administrator to join the organization',
    registerSuccess: 'Register succeed',
    registerFailed: 'Register failed',
  },
  project: {
    add: 'Add project',
    edit: 'Edit Project',
    nameLabel: 'Project name',
    deleteMessage: 'Are you sure to delete this project?',
  },
  application: {
    add: 'New app',
    new: 'New app',
    edit: 'Edit app',
    nameLabel: 'App name',
    applicationList: 'Application List',
    fetchListFailed: 'Fetch Application list failed',
    nameInvalid: 'Please input name',
    slugInvalid: 'Please input slug',
    hostInvalid: 'Please input host',
    regionInvalid: 'Please select country/region',
    languageInvalid: 'Please select language',
    typeInvalid: 'Please select type',
    downloadHostInvalid: 'Please input download host',
    fetchDetailFailed: 'Fetch application info failed.',
    fetchLocalesFailed: 'Fetch locales failed',
    nameLengthInvalid: 'Name must be longer than or equal to 5 characters',
    notSelectError: 'Please select application',
    resourceNameInvalid: 'Please input resource name',
    resourceTypeInvalid: 'Please select resource type',
    addLocale: 'Add Locale',
    addResource: 'Add Resource',
    selectApplication: 'select application',
  },
  folder: {
    name: 'Folder',
    add: 'Add folder',
    nameLabel: 'Folder name',
    deleteTitle: 'Are you sure to delete it?',
    deleteMsg: 'All content under these node will not be visible.',
  },
  file: {
    name: 'File',
    add: 'Add file',
    edit: 'Edit file',
    nameLabel: 'File name',
    page: 'Page',
    template: 'Template',
    package: 'Package',
    pathname: 'Pathname',
    deleteMessage: 'Are you sure to delete this ',
    filePath: 'File path',
    relPath: 'Rel path',
    fetchDetailFailed: 'Fetch file detail failed',
    fetchPageListFailed: 'Fetch page list failed.',
  },
  content: {
    name: 'content',
    add: 'Add content',
    edit: 'Edit content',
    nameLabel: 'Content name',
    deleteMessage: 'Are you sure to delete',
    query: 'Query',
    fetchFailed: 'Fetch contents failed',
  },
  team: {
    add: 'Add team',
    edit: 'Edit team',
    userCount: 'User count',
    nameLabel: 'Team name',
    userManagement: 'User management',
    addUser: 'Add user',
    userId: 'User id',
    joinTime: 'Join time',
    account: 'Account',
    accountInfo: 'Account info',
    selectUserPlaceHolder: 'Please select users',
    fetchUsersFailed: 'Fetch team users failed.',
  },
  condition: {
    add: 'Add condition',
    name: 'Conditions',
    nameLabel: 'Condition name',
    arithmeticLogic: 'Arithmetic logic',
    deleteFailMsg: 'Delete condition failed, please retry later',
    time: 'Time',
    show: 'show',
    hide: 'hide',
    general: 'General',
    advanced: 'Advanced',
    timezoneSelect: 'Select a time zone',
    selectCondition: 'Select condition',
    fetchFailed: 'Fetch condition list failed',
  },
  function: {
    name: 'Function',
    add: 'Add function',
    nameLabel: 'Function name',
    fetchFailed: 'Fetch function list failed',
  },
  package: {
    component: 'Component',
    editor: 'Editor',
    library: 'Library',
    fetchFailed: 'Fetch list failed',
    setVersionLiveTip: 'Are you sure set this version status to live?',
  },
  component: {
    add: 'Add component',
    fetchDetailFailed: 'Fetch component info failed',
    fetchUpdateInfoFailed: 'Fetch component updates failed',
    fetchListFailed: 'Fetch component list failed',
  },
  editor: {
    add: 'Add function',
  },
  library: {
    add: 'Add library',
  },
  version: {
    add: 'Add version',
    edit: 'Edit version',
    name: 'Version',
    source: 'Source',
    dependency: 'Dependencies',
    config: 'Config',
    useStyleEditor: 'UseStyleEditor',
    enableChildren: 'EnableChildren',
    changelog: 'Changelog',
    liveVersion: 'Live version',
    status: 'Status',
    versionError: 'Please input valid version!',
    publish: 'Publish',
    republish: 'Republish',
    live: 'Live',
    componentVersion: 'Component version',
    syncTitle: 'Sync from cloud',
  },
  resource: {
    group: 'Group',
    groupError: 'Please select group',
    resourceFolder: 'Resource Folder',
    resourceVersion: 'Resource Version',
    deleteTitle: 'Are you sure to delete it?',
    deleteMsg: 'All content under these group will not be visible.',
    resourceGroup: 'Resource groups',
    addResourceGroup: 'Add resource group',
    addGroup: 'Add group',
    editGroup: 'Edit group',
    groupName: 'Group name',
    groupType: 'Resource type',
    groupInfo: 'Group info',
    manifestPath: 'Manifest path',
    selfBuild: 'self-build',
    thirdParty: 'third-party',
  },
  setting: {
    basicInfo: 'Basic info',
    accessControl: 'Access control',
    Introduction: 'Introduction',
    downloadHost: 'Download host',
    region: 'Country/region',
    language: 'Language',
    resource: 'Resource',
    slug: 'Slug',
  },
  builder: {
    componentList: 'Component list',
    componentSearch: 'Input search text',
    pageStyle: 'Page style',
    pad: 'Pad',
    pc: 'PC',
    mobile: 'Mobile',
    zoom: 'Zoom',
    more: 'More',
    preview: 'Preview',
    pageStore: 'Page store',
    selectTemplateError: 'Please select template',
    selectPageError: 'Please select page',
    selectPageModalTitle: 'Select page',
    selectTemplateModalTitle: 'Select template',
    lastStep: 'Last step',
    nextStep: 'Next step',
    noComponentError: 'Please add these component to your application',
    selectPage: 'Click to select page',
    componentCopyMsg: 'Are you sure to copy this component?',
    componentDeleteMsg: 'Are you sure to delete this component?',
    fetchDslFailed: 'Fetch dsl failed',
    fetchCatalogFailed: 'Fetch catalog failed',
    fetchTemplateFailed: 'Fetch template failed',
  },
  variable: {
    title: 'Variable',
    add: 'Add variable',
    edit: 'Edit Variable',
    args: 'Args',
    value: 'Value',
    selectFunction: 'Select function',
    fetchFailed: 'Get variable failed',
    fetchDetailFailed: 'Get variable detail failed',
    notExist: 'Variable(${name}) not exist!',
    useVariableTitle: 'Variable use',
    useVariableTip: 'use variable(eg:',
    useVariableAttrTip: 'use variable attrs(eg:',
    content: 'Content',
  },
};
export default en;

export const methods = [
  'GET',
  'HEAD',
  'OPTIONS',
  'TRACE',
  'PUT',
  'DELETE',
  'POST',
  'PATCH',
  'CONNECT'
] as const;

export const statusCodes = new Map([
    // Informational
    [100, 'Continue'] as const,
    [101, 'Switching Protocols'] as const,
    [102, 'Processing'] as const,
    [103, 'Early Hints'] as const,

    // Success
    [200, 'OK'] as const,
    [201, 'Created'] as const,
    [202, 'Accepted'] as const,
    [203, 'Non-Authoritative Information'] as const,
    [204, 'No Content'] as const,
    [205, 'Reset Content'] as const,
    [206, 'Partial Content'] as const,
    [207, 'Multi-Status'] as const,
    [208, 'Already Reported'] as const,
    [226, 'IM Used'] as const,

    // Redirection
    [300, 'Multiple Choices'] as const,
    [301, 'Moved Permanently'] as const,
    [302, 'Found'] as const,
    [303, 'See Other'] as const,
    [304, 'Not Modified'] as const,
    [305, 'Use Proxy'] as const,
    [306, 'Unused'] as const,
    [307, 'Temporary Redirect'] as const,
    [308, 'Permanent Redirect'] as const,

    // Client Error
    [400, 'Bad Request'] as const,
    [401, 'Unauthorized'] as const,
    [402, 'Payment Required'] as const,
    [403, 'Forbidden'] as const,
    [404, 'Not Found'] as const,
    [405, 'Method Not Allowed'] as const,
    [406, 'Not Acceptable'] as const,
    [407, 'Proxy Authentication Required'] as const,
    [408, 'Request Timeout'] as const,
    [409, 'Conflict'] as const,
    [410, 'Gone'] as const,
    [411, 'Length Required'] as const,
    [412, 'Precondition Failed'] as const,
    [413, 'Request Entity Too Large'] as const,
    [414, 'Request-URI Too Long'] as const,
    [415, 'Unsupported Media Type'] as const,
    [416, 'Requested Range Not Satisfiable'] as const,
    [417, 'Expectation Failed'] as const,
    [418, 'I\'m a teapot'] as const,
    [419, 'Authentication Timeout (not in RFC 2616)'] as const,
    [421, 'Misdirected Request'] as const,
    [422, 'Unprocessable Entity'] as const,
    [423, 'Locked'] as const,
    [424, 'Failed Dependency'] as const,
    [425, 'Too Early'] as const,
    [426, 'Upgrade Required'] as const,
    [428, 'Precondition Required'] as const,
    [429, 'Too Many Requests'] as const,
    [431, 'Request Header Fields Too Large'] as const,
    [449, 'Retry With'] as const,
    [451, 'Unavailable For Legal Reasons'] as const,
    [499, 'Client Closed Request'] as const,

    // Server Error
    [500, 'Internal Server Error'] as const,
    [501, 'Not Implemented'] as const,
    [502, 'Bad Gateway'] as const,
    [503, 'Service Unavailable'] as const,
    [504, 'Gateway Timeout'] as const,
    [505, 'HTTP Version Not Supported'] as const,
    [506, 'Variant Also Negotiates'] as const,
    [507, 'Insufficient Storage'] as const,
    [508, 'Loop Detected'] as const,
    [509, 'Bandwidth Limit Exceeded'] as const,
    [510, 'Not Extended'] as const,
    [511, 'Network Authentication Required'] as const,
    [520, 'Unknown Error'] as const,
    [521, 'Web Server Is Down'] as const,
    [522, 'Connection Timed Out'] as const,
    [523, 'Origin Is Unreachable'] as const,
    [524, 'A Timeout Occurred'] as const,
    [525, 'SSL Handshake Failed'] as const,
    [526, 'Invalid SSL Certificate'] as const,
  ]
);

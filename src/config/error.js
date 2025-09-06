const ERROR_MESSAGE = {
    ERROR: "ERR_0000",
    REQUIRED_PARAMS: "ERR_1000",
    PARAMS_INVALID: "ERR_1001",
    ERR_REFERRAL_CODE_NOT_EXIST: 'ERR_2001',
    ERR_REFERRAL_EXIST_INVITED: 'ERR_2002',
    ERR_REFERRAL_CLAIM_NOT_EXIST: 'ERR_2003',
    ERR_REFERRAL_CLAIM_NOT_ENOUGH_EARNED: 'ERR_2004',
    ERR_REFERRAL_CODE_INVALID: 'ERR_2005',
    ERR_REWARD_CODE_CHECKIN_INVALID: 'ERR_2006',
    ERR_REFERRAL_CLAIM_OFF: 'ERR_2007',
    ERR_SUBMIT_TOKEN_INVALID: 'ERR_3001',

    ERR_IMPORT_NFT_TOKEN_INVALID: 'ERR_4001',
    ERR_IMPORT_NFT_NOT_EXIST: 'ERR_4002',


    ERR_ZAPPER_INSUFFICIENT: 'ERR_5001',
    ERR_ZAPPER_AMOUNT_EXCEED_BALANCE: 'ERR_5002',
    ERR_ZAPPER_AMOUNT_EXCEED_ALLOWANCE: 'ERR_5003',
    ERR_ZAPPER_SLIPPAGE: 'ERR_5004',

    LOGIN_INCORRECT_PASSWORD: 'Mật khẩu không đúng',

    ERR_0000: "Something went wrong!",
    ERR_1000: "Required Params",
    ERR_1001: "Request Params Invalid",
    ERR_2001: 'Invited code invalid',
    ERR_2002: 'Your wallet exit invited code',
    ERR_2003: 'Claim request invalid',
    ERR_2004: 'Not enough earned token to claim',
    ERR_2005: 'Invited code invalid',
    ERR_2006: 'Invalid claim checkin',
    ERR_2007: 'Withdraw rewards is currently paused. Please try again later.',
    ERR_3001: 'Token address invalid',
    ERR_4001: 'Token address invalid',
    ERR_4002: 'You are not the owner of this collectible, so you can’t add it',
    ERR_5001: 'You may not have enough ETH balance for gas fee',
    ERR_5002: 'Not enough balance',
    ERR_5003: 'Not enough allowance',
    ERR_5004: 'Please increase your slippage tolerance and try again',
};

module.exports = {
    ERROR_MESSAGE,
};

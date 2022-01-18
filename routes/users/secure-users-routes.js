// Import the express Router to create routes
const router = require('express').Router();

// Imports from express validator to validate user input
const { check, oneOf } = require('express-validator');

// Import User Controller
const userController = require('../../controllers/users-controller');

const multer = require('multer');
const upload = multer({ dest: 'tmp/uploads/' })

router.post(
  '/bindWalletAddress',
  [check('walletAddress').notEmpty()],
  userController.bindWalletAddress
);

router.post(
  '/saveAdditionalInformation',
  oneOf([
    [
      check('name').notEmpty(),
      check('username').notEmpty(),
      check('username').isLength({ min: 3, max: 25 }),
      check('name').isLength({ min: 3 }),
    ],
    check('email').isEmail(),
  ]),
  userController.saveAdditionalInformation
);

router.post(
  '/acceptConditions',
  [check('conditions').isArray({ min: 3, max: 3 })],
  userController.saveAcceptConditions
);

router.get('/refList', userController.getRefList);

router.get('/open-bets', userController.getOpenBetsList);

router.get('/history', userController.getHistory);

router.get('/trade-history', userController.getTradeHistory);

router.patch(
  '/:userId',
  oneOf([[check('username').isLength({ min: 3, max: 25 }), check('email').isEmail()]]),
  userController.updateUser
);

router.patch(
  '/:userId/preferences',
  [check('preferences').notEmpty()],
  userController.updateUserPreferences
);

router.get('/:userId', userController.getUserInfo);

router.post('/:userId/status', userController.updateStatus);

router.get('/wallet/transactions', userController.getUserTransactions);

router.get('/:userId/kyc-data', userController.getUserKycData);

router.get('/kyc/status', userController.getKycStatus);
router.post('/buy-with-crypto', userController.buyWithCrypto);
router.post('/buy-with-fiat', userController.buyWithFiat);
router.post('/consent', userController.updateUserConsent);

router.post(
  '/cryptopay/channel',
  [check('currency').isIn(['BTC', 'ETH', 'LTC'])],
  userController.cryptoPayChannel
);

router.post(
  '/moonpay/url',
  userController.generateMoonpayUrl
)

router.post(
  '/:userId/ban',
  [check('duration').isNumeric(), check('description').isString()],
  userController.banUser
);

router.post('/add-bonus', userController.addBonus);
router.post('/add-bonus-manually', upload.single('file'), userController.addBonusManually);

router.get('/kyc/refresh', userController.refreshKycRoute);

router.post('/bonusflag/:type', userController.handleBonusFlag);
router.delete('/bonusflag/:type', userController.handleBonusFlag);
router.get('/bonusflag/check', userController.getBonusesByUser);

module.exports = router;

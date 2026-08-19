const express = require('express');
const { register, login, getMe } = require('../controllers/auth.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

// Demo protected routes for Week 1-2 task
router.get('/user-dashboard', protect, (req, res) => {
  res.json({ success: true, msg: `Welcome User ${req.user.id}`, role: req.user.role });
});
router.get('/admin-dashboard', protect, authorize('admin'), (req, res) => {
  res.json({ success: true, msg: `Welcome Admin ${req.user.id}` });
});

module.exports = router;

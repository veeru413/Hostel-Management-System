const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;


const { sequelize } = require('./database'); 
const Administrator = require('./models/administrator');
const Student = require('./models/student');


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'hostel_secret',
    resave: false,
    saveUninitialized: true
}));


sequelize.sync({ force: true }).then(() => {
    console.log('Database synced');

    Administrator.create({
        username: 'lohitakshareddykr.23is@saividya.ac.in',
        password: '123456789',
    });

    Student.bulkCreate([
        { name: 'Amit Kumar', roll: 'ROLL001', password: 'ROLL001', room_no: 201, payment_status: 'PAID', room_status: 'checked_in' },
        { name: 'Priya Sharma', roll: 'ROLL002', password: 'ROLL002', room_no: 201, payment_status: 'NOT PAID', room_status: 'not_checked_in' },
        { name: 'Ravi Verma', roll: 'ROLL003', password: 'ROLL003', room_no: 202, payment_status: 'PAID', room_status: 'checked_in' },
        { name: 'Sneha Patel', roll: 'ROLL004', password: 'ROLL004', room_no: 202, payment_status: 'NOT PAID', room_status: 'not_checked_in' },
        { name: 'Kunal Singh', roll: 'ROLL005', password: 'ROLL005', room_no: 203, payment_status: 'PAID', room_status: 'checked_in' },
        { name: 'Anita Desai', roll: 'ROLL006', password: 'ROLL006', room_no: 203, payment_status: 'NOT PAID', room_status: 'not_checked_in' },
        { name: 'Vikram Rao', roll: 'ROLL007', password: 'ROLL007', room_no: 204, payment_status: 'PAID', room_status: 'checked_in' },
        { name: 'Pooja Gupta', roll: 'ROLL008', password: 'ROLL008', room_no: 204, payment_status: 'NOT PAID', room_status: 'not_checked_in' },
        { name: 'Rahul Mehra', roll: 'ROLL009', password: 'ROLL009', room_no: 205, payment_status: 'PAID', room_status: 'checked_in' },
        { name: 'Neha Yadav', roll: 'ROLL010', password: 'ROLL010', room_no: 205, payment_status: 'NOT PAID', room_status: 'not_checked_in' },
    ]);
}).catch(err => {
    console.error('Unable to sync database:', err);
});


app.get('/', (req, res) => {
    res.render('initial');
});


app.get('/admin-login', (req, res) => {
    res.render('admin_login');
});


app.post('/admin-login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Administrator.findOne({ where: { username, password } });
        if (admin) {
            req.session.admin = true;
            res.redirect('/admin-dashboard');
        } else {
            res.render('admin_login', { error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.send('An error occurred');
    }
});


app.get('/student-login', (req, res) => {
    res.render('student_login');
});


app.post('/student-login', async (req, res) => {
    const { roll, password } = req.body;
    if (roll !== password) {
        res.render('student_login', { error: 'Username and password must be the same' });
        return;
    }
    try {
        const student = await Student.findOne({ where: { roll, password } });
        if (student) {
            req.session.studentRoll = roll;
            res.redirect('/student-details');
        } else {
            res.render('student_login', { error: 'Wrong userid and password' });
        }
    } catch (err) {
        console.error(err);
        res.send('An error occurred');
    }
});


app.get('/register', (req, res) => {
    res.render('register');
});


app.post('/register', async (req, res) => {
    const { name, roll } = req.body;
    const password = roll; 
    try {
        const newStudent = await Student.create({ name, roll, password });
        req.session.studentRoll = roll;
        res.redirect('/student-details');
    } catch (err) {
        console.error(err);
        res.send('Error: Roll number already exists or invalid data');
    }
});


app.get('/student-details', async (req, res) => {
    if (!req.session.studentRoll) {
        res.redirect('/student-login');
        return;
    }
    try {
        const student = await Student.findOne({ where: { roll: req.session.studentRoll } });
        res.render('student_details', { student });
    } catch (err) {
        console.error(err);
        res.send('An error occurred');
    }
});


app.get('/admin-dashboard', (req, res) => {
    if (!req.session.admin) {
        res.redirect('/admin-login');
        return;
    }
    res.render('admin_dashboard');
});


app.post('/search-student', async (req, res) => {
    if (!req.session.admin) {
        res.redirect('/admin-login');
        return;
    }
    const { roll } = req.body;
    try {
        const student = await Student.findOne({ where: { roll } });
        if (student) {
            res.render('student_details', { student });
        } else {
            res.send('Student not found');
        }
    } catch (err) {
        console.error(err);
        res.send('An error occurred');
    }
});


app.get('/all-students', async (req, res) => {
    if (!req.session.admin) {
        res.redirect('/admin-login');
        return;
    }
    try {
        const students = await Student.findAll();
        res.render('all_students', { students });
    } catch (err) {
        console.error(err);
        res.send('An error occurred');
    }
});


app.get('/payment', (req, res) => {
    if (!req.session.studentRoll) {
        res.redirect('/student-login');
        return;
    }
    res.render('payment');
});

app.post('/payment', async (req, res) => {
    if (!req.session.studentRoll) {
        res.redirect('/student-login');
        return;
    }
    const { roll } = req.body;
    if (roll !== req.session.studentRoll) {
        res.send('Roll number does not match');
        return;
    }
    try {

        const maxRoom = await Student.max('room_no') || 200;

        const roomCount = await Student.count({ where: { room_no: maxRoom + 1 } });
        let roomNo = (roomCount < 3) ? maxRoom + 1 : maxRoom + 2;


        await Student.update(
            { payment_status: 'PAID', room_no: roomNo, room_status: 'checked_in' },
            { where: { roll } }
        );


        const updatedStudent = await Student.findOne({ where: { roll } });
        res.render('student_details', { student: updatedStudent }); 
    } catch (err) {
        console.error('Payment error:', err);
        res.send('An error occurred during payment processing');
    }
});


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
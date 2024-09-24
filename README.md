# Fibonacci Sequence and Sum Calculation

นี่คือโปรเจคที่ใช้ **Node.js with Express** ในการคำนวณลำดับ Fibonacci โดยรับค่าจาก 1-100 และคำนวณผลรวมของลำดับที่กำหนด

## ขั้นตอนการทำงาน

1. **ติดตั้ง Express:**
   - รันคำสั่งเพื่อสร้างไฟล์ `package.json` และติดตั้ง Express:
     ```bash
     npm init -y
     npm install express
     ```
   - ตรวจสอบให้แน่ใจว่าใน `package.json` มี Express อยู่ใน dependencies:
     ```json
     "dependencies": {
       "express": "^4.x.x"
     }
     ```

2. **สร้างไฟล์ `index.js`:**
   - ไฟล์หลักที่ใช้ในการคำนวณลำดับ Fibonacci และแสดงผลผ่านพอร์ต 3000
   - สร้างฟังก์ชัน `fibonacci` ที่รับค่าจากผู้ใช้และจำกัดให้รับค่าระหว่าง 1-100
   - ถ้าผู้ใช้ส่งค่ามากกว่า 100, ค่าติดลบ, หรือไม่ส่งค่าใด ๆ จะเกิดข้อผิดพลาด (Error) ทันที

3. **ตัวอย่างการใช้งานและฟังก์ชันหลัก:**
   - คำนวณลำดับ Fibonacci ตามจำนวนที่ผู้ใช้ส่งเข้ามา
   - คำนวณผลรวมของลำดับ Fibonacci ที่ได้
   - ส่งผลลัพธ์กลับไปยังผู้ใช้ในรูปแบบ JSON

4. **การรันโปรเจค:**
   - รันเซิร์ฟเวอร์โดยใช้คำสั่ง:
     ```bash
     node index.js
     ```

5. **การทดสอบการทำงาน:**
   - ใช้ **Postman** หรือ **เว็บเบราว์เซอร์** ทดสอบโดยใช้ GET Request:
     ```url
     http://localhost:3000/fibonacci/8
     ```
   - ในที่นี้ `8` คือจำนวนลำดับ Fibonacci ที่ต้องการ หากเกิน 100 หรือต่ำกว่า 1 จะเกิดข้อผิดพลาด (Error)

## โค้ดตัวอย่างใน `index.js`:

```javascript
const express = require('express');
const app = express();
const port = 3000;

// ฟังก์ชันคำนวณลำดับ Fibonacci
function fibonacci(n) {
    if (n < 1 || n > 100) {
        throw new Error('จำนวนต้องอยู่ระหว่าง 1-100');
    }
    let fibSeq = [0, 1];
    for (let i = 2; i <= n; i++) {
        fibSeq[i] = fibSeq[i - 1] + fibSeq[i - 2];
    }
    return fibSeq.slice(1, n + 1); // ตัด 0 ออก เพราะ Fibonacci เริ่มจาก 1
}

// ฟังก์ชันคำนวณผลรวมของลำดับ Fibonacci
function sumFibonacci(seq) {
    return seq.reduce((acc, num) => acc + num, 0);
}

// Route สำหรับ Fibonacci
app.get('/fibonacci/:n', (req, res) => {
    const n = parseInt(req.params.n);
    try {
        const fibSeq = fibonacci(n);
        const sum = sumFibonacci(fibSeq);
        res.status(200).json({
            sequence: fibSeq,
            sum: sum
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

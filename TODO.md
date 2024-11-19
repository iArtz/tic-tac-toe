# ให้ผู้สมัครทำกำรพัฒนำเกม OX (Tic-tac-toe) ในรูปแบบของ Web Application โดยมี Requirement ดังต่อไปนี้

- [ ] ผู้เล่นจะต้องเข้าสู่ระบบก่อนเริ่มเล่นเกม
- [ ] การเข้าสู่ระบบจะต้องพัฒนำตำมมำตรฐำน OAuth 2.0
- [ ] กติกการเล่นเกมเหมือน OX ทั่วไป (ผู้เล่น vs บอท)
- [ ] มีระบบเก็บคะแนน
- [ ] เมื่อผู้เล่นเอาชนะบอทได้ จะได้รับ 1 คะแนน (ถ้าแพ้จะเสีย 1 คะแนน)
- [ ] ถ้าผู้เล่นเอาชนะบอทได้ 3 ครั้งติดต่อกันจะได้รับคะแนนพิเศษเพิ่มอีก 1 คะแนน และการนับจำนวนครั้งที่ชนะติดต่อกันจะถูก นับใหม่
- [ ] มีเครื่องมือสำหรับเข้ำไปตรวจสอบคะแนนของผู้เล่นทั้งหมด

## Tech Stacks & Implementation

- Framework
  - NextJS + Typescript
- Authentication & Authorization
  - Auth0
- Database
  - Mongo (keeping player scores)

### Application Check List

- [ ] Create a app
  - [ ] Generate NextJS
  - [ ] initialize git repo
- [ ] Create mongo container
- [ ] Initialize mongo project
  - [ ] Install mongodb and mongoose
  - [ ] Create models
    - [ ] Players
- [ ] Create users collection
- [ ] Connect to the database
- [ ] List all records with GET /api/v1/player
- [ ] Setup tests
  - [ ] Install test libs
  - [ ] Add a test database connection
  - [ ] Add npm test script
    - [ ] Drop/Create database
  - [ ] Create before
    - [ ] Run migrations/seeds on test db
- [ ] Make sure the tests are working!
- [ ] List all records with GET /api/v1/players
  - [ ] Add test
- [ ] Show one record with GET /api/v1/players/:id
  - [ ] Validate id
  - [ ] Create query
  - [ ] Create route
  - [ ] Add test
- [ ] Create a record with POST /api/v1/players
  - [ ] Create route
  - [ ] Validate player!
  - [ ] Create query
  - [ ] Add test
- [ ] Update a record with PUT /api/v1/players/:id
  - [ ] Create route
  - [ ] Validate id
  - [ ] Validate updates
  - [ ] Create query
  - [ ] Add test
- [ ] Delete a record with DELETE /api/v1/players/:id
  - [ ] Create route
  - [ ] Validate id
  - [ ] Create query
  - [ ] Add test
- [ ] Query sting /api/v1/players?name=:name
  - [ ] Create route
  - [ ] Create query
  - [ ] Add test
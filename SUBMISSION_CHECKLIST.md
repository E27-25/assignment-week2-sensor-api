# Assignment Week 2 - Submission Checklist

Use this checklist to ensure you've completed all requirements before submission.

## ✅ Requirements Checklist

### Core Requirements

- [ ] **Website and API Created**
  - [ ] API built with Hono framework
  - [ ] React webapp created
  - [ ] Both communicate successfully

- [ ] **PostgreSQL Database**
  - [ ] Database set up (Neon/Vercel Postgres)
  - [ ] Schema created using Drizzle ORM
  - [ ] Migrations run successfully
  - [ ] Data is persisting correctly

- [ ] **Sensor Data Support**
  - [ ] API accepts sensor readings
  - [ ] Can simulate/mock sensor data
  - [ ] Multiple sensor types supported
  - [ ] Data stored in PostgreSQL

- [ ] **Data Display in Graph Format**
  - [ ] Chart displays sensor data
  - [ ] Chart is readable and clear
  - [ ] Data updates properly
  - [ ] Multiple data points visible

- [ ] **No Authentication Required**
  - [ ] API uses Bearer token (simple)
  - [ ] No complex user authentication
  - [ ] Easy to test and demo

### Deployment

- [ ] **API Deployed to Vercel**
  - [ ] API is accessible online
  - [ ] Live URL works
  - [ ] Environment variables set
  - [ ] Database connected

- [ ] **Webapp Deployed to Vercel**
  - [ ] Webapp is accessible online
  - [ ] Live URL works
  - [ ] Connected to deployed API
  - [ ] Charts display correctly

### Code Submission

- [ ] **GitHub Repository OR Zipped Project**
  - [ ] Code is organized
  - [ ] README.md included
  - [ ] .env.example files included
  - [ ] No node_modules included
  - [ ] .gitignore configured

## 📝 Pre-Submission Testing

### Local Testing

```bash
# Test API Health
curl http://localhost:3000/api/v1/health \
  -H "Authorization: Bearer your_secret"

# Test Creating Sensor Data
curl -X POST http://localhost:3000/api/v1/sensors \
  -H "Authorization: Bearer your_secret" \
  -H "Content-Type: application/json" \
  -d '{"sensorName":"Test","sensorType":"DHT22","value":25.5,"unit":"°C"}'

# Test Getting Sensor Data
curl http://localhost:3000/api/v1/sensors \
  -H "Authorization: Bearer your_secret"
```

- [ ] All API endpoints work
- [ ] Webapp loads without errors
- [ ] Chart displays data
- [ ] Data refreshes automatically

### Deployment Testing

Replace with your deployed URLs:

```bash
# Test Deployed API Health
curl https://your-api.vercel.app/api/v1/health \
  -H "Authorization: Bearer your_secret"

# Test Deployed API Create
curl -X POST https://your-api.vercel.app/api/v1/sensors \
  -H "Authorization: Bearer your_secret" \
  -H "Content-Type: application/json" \
  -d '{"sensorName":"Test","sensorType":"DHT22","value":25.5,"unit":"°C"}'
```

- [ ] Deployed API responds correctly
- [ ] Deployed webapp loads
- [ ] Webapp connects to API
- [ ] CORS configured correctly
- [ ] No console errors

## 📚 Documentation Checklist

### README.md Should Include:

- [ ] Project title and description
- [ ] Features list
- [ ] Technologies used
- [ ] Setup instructions
  - [ ] Prerequisites
  - [ ] Installation steps
  - [ ] Environment variables
  - [ ] How to run locally
- [ ] API documentation
  - [ ] Endpoints list
  - [ ] Request/response examples
- [ ] Deployment URLs
  - [ ] Live API URL
  - [ ] Live webapp URL
- [ ] Screenshots (optional but recommended)
- [ ] Team members (if group project)

### Code Quality

- [ ] Code is properly formatted
- [ ] No console.log statements in production
- [ ] Error handling implemented
- [ ] TypeScript types used correctly
- [ ] Comments for complex logic
- [ ] No sensitive data in code (use .env)

## 🎁 Bonus Points Opportunities

Consider adding these for extra credit:

- [ ] **Additional Features**
  - [ ] Multiple chart types (line, bar, pie)
  - [ ] Date range filtering
  - [ ] Sensor type filtering
  - [ ] Real-time updates with WebSockets
  - [ ] Delete functionality in UI
  - [ ] Export data to CSV

- [ ] **Enhanced UI/UX**
  - [ ] Dark/light mode toggle
  - [ ] Mobile responsive design
  - [ ] Loading states
  - [ ] Error messages
  - [ ] Beautiful animations
  - [ ] Professional styling

- [ ] **Technical Excellence**
  - [ ] Unit tests
  - [ ] API documentation (Swagger/OpenAPI)
  - [ ] Docker support
  - [ ] CI/CD pipeline
  - [ ] Performance optimization
  - [ ] SEO optimization

- [ ] **Real IoT Integration**
  - [ ] Actual IoT device connected
  - [ ] Arduino/ESP8266 code included
  - [ ] Hardware photos/videos

## 📤 Submission Format

### Option A: GitHub Repository (Recommended)

1. Create a new GitHub repository
2. Push all code to the repository
3. Add a comprehensive README.md
4. Include deployment URLs in README
5. Submit the GitHub URL on Onlearn

**Repository should include:**
```
assignment-week2-sensor-api/
├── README.md (with deployment URLs)
├── QUICKSTART.md
├── api/
├── webapp/
├── generate_mock_data.sh
├── simulate_sensor.py
└── .gitignore
```

### Option B: Zipped Project

1. Remove node_modules folders
2. Remove .env files (keep .env.example)
3. Include README.md with deployment URLs
4. Zip the entire project
5. Upload to Onlearn

**Before zipping, run:**
```bash
# Remove dependencies
rm -rf api/node_modules
rm -rf webapp/node_modules

# Remove build artifacts
rm -rf api/dist
rm -rf webapp/dist

# Remove local env files
rm -f api/.env
rm -f webapp/.env

# Zip the project
cd ..
zip -r assignment-week2-sensor-api.zip assignment-week2-sensor-api
```

## 📋 Final Submission Checklist

- [ ] All requirements completed
- [ ] Local testing passed
- [ ] Deployment testing passed
- [ ] README.md complete
- [ ] Live URLs included in README
- [ ] Code cleaned and formatted
- [ ] GitHub repo created OR project zipped
- [ ] Submitted on Onlearn

## 🚀 Live URLs to Include

Add these to your README.md:

```markdown
## Live Deployment

- **API**: https://your-api-name.vercel.app
- **Webapp**: https://your-webapp-name.vercel.app

### Test the API

bash
curl https://your-api-name.vercel.app/api/v1/sensors \
  -H "Authorization: Bearer your_secret_key"

```

## 💡 Tips for Success

1. **Test Early, Test Often**: Don't wait until the last minute to deploy
2. **Document as You Go**: Write README sections as you build features
3. **Keep It Simple**: Focus on meeting requirements first, then add extras
4. **Ask for Help**: Use Discord/office hours if you're stuck
5. **Version Control**: Commit frequently with meaningful messages
6. **Backup Everything**: Keep copies of environment variables

## ⏰ Submission Deadline

Check Onlearn for the exact deadline. Plan to finish 1-2 days early to handle any last-minute issues.

## 🎯 Grading Rubric (Example)

| Criteria | Points | Notes |
|----------|--------|-------|
| API Implementation | 25% | CRUD operations, PostgreSQL |
| Frontend/Charts | 25% | React app, data visualization |
| Deployment | 25% | Both API and webapp live |
| Code Quality | 15% | Clean, organized, documented |
| Documentation | 10% | README, setup instructions |
| Bonus Features | +10% | Extra functionality |

**Total**: 100% + 10% bonus

## 📞 Need Help?

- Check QUICKSTART.md for setup help
- Check DEPLOYMENT.md for deployment help
- Check TESTING.md for API testing help
- Ask questions on Discord
- Attend office hours

Good luck with your submission! 🎉

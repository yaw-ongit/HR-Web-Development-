const fs = require('fs');

let libServices = fs.readFileSync('src/lib/services.ts', 'utf8');
let talentService = fs.readFileSync('src/services/talentService.ts', 'utf8');

// Remove imports from talentService
talentService = talentService.replace(/import .*? from '.*?';/g, '');

// Replace export in libServices
libServices = libServices.replace("export { TalentService } from '@/services/talentService';", talentService);

fs.writeFileSync('src/lib/services.ts', libServices, 'utf8');

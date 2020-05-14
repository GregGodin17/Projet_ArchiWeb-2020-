var express = require('express');
var router = express.Router();
var bodyParser = require('body-Parser');
var CtrlRoutes = require('../controller/controller');
var CtrlRoutesAPI = require('../controller/controllerapi');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//_______________________________________________MVC_______________________________________________________

//______________________________________________Pages_______________________________________________________
//affichage de mes pages (views)
router.get('/inscription', CtrlRoutes.pageInscription);
router.get('/', CtrlRoutes.pageIndex);
router.get('/contact', CtrlRoutes.pageContact);
router.get('/membre', CtrlRoutes.pageMembre);
router.get('/section', CtrlRoutes.pageSection);


//______________________________________________Membre_______________________________________________________
//inscription d'un membre
router.post('/inscription/add', CtrlRoutes.addMembre);

//modification d'un membre
router.get('/membre/update/:id_membre', CtrlRoutes.updateMembrePage);
router.post('/membre/update', CtrlRoutes.updateMembre);

//suppression d'un membre
router.get('/membre/delete/:id_membre', CtrlRoutes.deleteMembre);

//______________________________________________Section_______________________________________________________
//Ajout d'une section
router.post('/section/add', CtrlRoutes.addSection);

//modification d'une section
router.get('/section/update/:id_section', CtrlRoutes.updateSectionPage);
router.post('/section/update', CtrlRoutes.updateSection);

//suppression d'une section
router.get('/section/delete/:id_section', CtrlRoutes.deleteSection);

module.exports = router;

//_______________________________________________API_______________________________________________________
//______________________________________________Pages_______________________________________________________
router.get('/api/membre', CtrlRoutesAPI.pageMembre);
router.get('/api/section', CtrlRoutesAPI.pageSection);

//______________________________________________Membre_______________________________________________________
//inscription d'un membre
router.post('/api/membre', CtrlRoutesAPI.addMembre);

//modification d'un membre
router.put('/api/membre/:id_membre', CtrlRoutesAPI.updateMembre);

//suppression d'un membre
router.delete('/api/membre/:id_membre', CtrlRoutesAPI.deleteMembre);

//______________________________________________Section_______________________________________________________
//Ajout d'une section
router.post('/api/section/', CtrlRoutesAPI.addSection);

//modification d'une section
router.put('/api/section/:id_section', CtrlRoutesAPI.updateSection);

//suppression d'une section
router.delete('/api/section/:id_section', CtrlRoutesAPI.deleteSection);

module.exports = router;
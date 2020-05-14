
var Membre = require('../models/Membre');
var Section = require('../models/Section');
var connection = require('../db');
let listeMembre = [];
let listeSection = [];

//______________________________________________Affichage des membres_______________________________________________________
exports.pageMembre = function (req, res) {
    connection.query('SELECT * FROM membre', function (error, result) {
            if (error) { res.status(400).json({ "message": 'erreur'});}
            else {
                res.json({ listeMembre: result });}
            
            })};
        ;    

//______________________________________________Affichage des sections_______________________________________________________

exports.pageSection = function (req, res) {
    connection.query('SELECT * FROM section', function (error, result) {
        if (error) { res.status(400).json({ "message": 'erreur'});}
        else{
            res.json({ listeSection: result });
    }});
};

//______________________________________________Membre_______________________________________________________
//Inscription d'un membre
exports.addMembre = function (req, res) {
    var membre = new Membre(
        req.body.id_membre,
        req.body.user_fname,
        req.body.user_lname,
        req.body.user_gender,
        req.body.user_date,
        req.body.user_adress,
        req.body.id_fk_section,
        req.body.num_contact);
    console.log(membre)
    connection.query("INSERT INTO membre set ?", [membre], function (error) {
        if (error) { res.status(400).json({ "message": 'erreur'});}
        else {
            res.status(201).json({ "message": 'réussi'});
        }});       
    };


//Modification des informations d'un membre

exports.updateMembre = function (req, res) {
    let membre = new Membre(
        req.body.id_membre,
        req.body.user_fname,
        req.body.user_lname,
        req.body.user_gender,
        req.body.user_date,
        req.body.user_adress,
        req.body.id_fk_section,
        req.body.num_contact);
    connection.query("UPDATE membre SET ? WHERE id_membre = ?",
        [membre, req.body.id_membre], function (error, resultSQL) {
            if (error) { res.status(400).json({ "message": 'erreur'});}
            else {
                res.json({ "message": 'réussi'});
            }
        })
};

//Suppression d'un membre

exports.deleteMembre = function (req, res) {
    let sql = "DELETE FROM `membre` WHERE `membre`.`id_membre` = ?";
    connection.query(sql, [req.params.id_membre], (error, resultSQL) => {
        if (error) { res.status(400).json({ "message": 'échec'});}
        else {
            res.json({ "message": 'succès'});

        }
    });
};
//______________________________________________SECTION_______________________________________________________
//Ajout d'une section
exports.addSection = function (req, res) {
    var section = new Section(
        req.body.id_section,
        req.body.section_name,
        req.body.dates_reunion);
    connection.query("INSERT INTO section set ?", [section], function (error, resultSQL) {

        if (error) { res.status(400).json({ "message": 'échec'});}
        else { res.json({ "message": 'succès'}); }
    });
};

//Modification des informations d'une section

exports.updateSection = function (req, res) {
    let section = new Section(
        req.body.id_section,
        req.body.section_name,
        req.body.dates_reunion
        );
    connection.query("UPDATE section SET ? WHERE id_section = ?",
        [section, req.body.id_section], function (error) {
            if (error) { res.status(400).json({ "message": 'échec'});} 
            else {
                res.json({"message": 'succès'});
            }
        })
};

//Suppression d'une section

exports.deleteSection = function (req, res) {
    let sql = "DELETE FROM `section` WHERE `section`.`id_section` = ?";
    connection.query(sql, [req.params.id_section], function (error) {
        if (error) { res.status(400).json({ "message": 'échec'});} 
        else {
            res.json({ "message": 'succès'});

        }
    });
};
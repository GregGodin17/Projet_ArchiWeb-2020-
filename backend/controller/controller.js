
var Membre = require('../models/Membre');
var Section = require('../models/Section');
var connection = require('../db');
let listeMembre = [];
let listeSection = [];

//______________________________________________Pages_______________________________________________________
//affichage de mes pages (views)
exports.pageIndex = function (req, res) {
    res.render('index.ejs');
};
exports.pageContact = function (req, res) {
    res.render('contact.ejs');
};
exports.pageInscription = function (req, res) {
    connection.query('SELECT * FROM section', function (err, result) {
        console.log(result);
        res.render('inscription.ejs', { listeSection: result });
    });
};


exports.pageMembre = function (req, res) {
    connection.query('SELECT * FROM membre INNER JOIN section ON membre.id_fk_section = section.id_section', function (error, result) {
        if (error) { res.status(400).send(error);}
        else {connection.query('SELECT * FROM membre', function (error, result) {
            if (error) { res.status(400).send(error);}
            else {
                console.log(result);
                res.render('membre.ejs', { listeMembre: result });}
            
            })};
        })};    

exports.pageSection = function (req, res) {
    connection.query('SELECT * FROM section', function (err, result) {
        console.log(result);
        res.render('section.ejs', { listeSection: result });
    });
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
        if (error) { res.status(400).send(error); }
        else {connection.query('SELECT * FROM section', function (err, result) {
            console.log(result);
            res.render('inscription.ejs', { listeSection: result });
        });
            res.status(201).redirect('/membre'); }
    });
};

//Modification des informations d'un membre
exports.updateMembrePage = function (req, res) {
    connection.query('SELECT * FROM section', function (error, result) {
        if (error) { res.status(400).send(error); }
        else {
            
            let id = req.params.id_membre;
            let sql = "Select * FROM membre WHERE `membre`.`id_membre` = ?";
            connection.query(sql, id, function (error, resultSQL) {
                if (error) { res.status(400).send(error); }
                else {
                    res.status(200);
                    console.log(resultSQL);
                    membres = resultSQL;
                    res.render('membre_update.ejs', {
                        id_membre: membres[0].id_membre,
                        user_fname: membres[0].user_fname,
                        user_lname: membres[0].user_lname,
                        user_gender: membres[0].user_gender,
                        user_date: membres[0].user_date,
                        user_adress: membres[0].user_adress,
                        id_fk_section: membres[0].id_fk_section,
                        num_contact: membres[0].num_contact,
                        listeSection: result
                    })
                };
            });
        }
    })
}

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
    console.log(membre);
    connection.query("UPDATE membre SET ? WHERE id_membre = ?",
        [membre, req.body.id_membre], function (error, resultSQL) {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            } else {
                res.status(202).redirect('/membre');
            }
        })
};

//Suppression d'un membre
exports.deleteMembre = function (req, res) {
    let sql = "DELETE FROM `membre` WHERE `membre`.`id_membre` = ?";
    connection.query(sql, [req.params.id_membre], (error, resultSQL) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.redirect('/membre');

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
    console.log(section)
    connection.query("INSERT INTO section set ?", [section], function (error, resultSQL) {

        if (error) { res.status(400).send(error); }
        else { res.status(201).redirect('/section'); }
    });
};

//Modification des informations d'une section
exports.updateSectionPage = function (req, res) {

    let id = req.params.id_section;
    let sql = "Select * FROM section WHERE `section`.`id_section` = ?";
    connection.query(sql, id, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        }
        else {
            res.status(200);
            console.log(resultSQL);
            sections = resultSQL;
            res.render('section_update.ejs', {
                id_section: sections[0].id_section, 
                section_name: sections[0].section_name,
                dates_reunion: sections[0].dates_reunion 
            });
        }
    });
};

exports.updateSection = function (req, res) {
    let section = new Section(
        req.body.id_section,
        req.body.section_name,
        req.body.dates_reunion
        );
    console.log(section);
    connection.query("UPDATE section SET ? WHERE id_section = ?",
        [section, req.body.id_section], function (error) {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            } else {
                res.status(202).redirect('/section');
            }
        })
};

//Suppression d'une section

exports.deleteSection = function (req, res) {
    let sql = "DELETE FROM `section` WHERE `section`.`id_section` = ?";
    connection.query(sql, [req.params.id_section], (error, resultSQL) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.redirect('/section');

        }
    });
};
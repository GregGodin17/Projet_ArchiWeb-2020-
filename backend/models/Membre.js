class Membre{
    constructor (id_membre, user_fname, user_lname, user_gender, user_date, user_adress, id_fk_section, num_contact)
    {
        this.id_membre = id_membre;
        this.user_fname = user_fname;
        this.user_lname = user_lname;
        this.user_gender = user_gender;  
        this.user_date  = user_date;
        this.user_adress = user_adress;
        this.id_fk_section = id_fk_section;
        this.num_contact = num_contact;
     }
}

 module.exports = Membre; 
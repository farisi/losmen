package net.myapp.application.data.entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="transactions")
public class Transaction extends AbstractEntity  {

    private Timestamp check_in_at;
    private Timestamp check_out_at;
    
    private String name;
    private String carid;
    
    @Column(columnDefinition = "ENUM('KTP','PASSPORT','SIM')")
    @Enumerated(EnumType.STRING)
    private CardType tipe;

    @ManyToOne
    private Room room;

    public Timestamp getCheck_in_at() {
        return check_in_at;
    }
    public void setCheck_in_at(Timestamp check_in_at) {
        this.check_in_at = check_in_at;
    }
    public Timestamp getCheck_out_at() {
        return check_out_at;
    }
    public void setCheck_out_at(Timestamp check_out_at) {
        this.check_out_at = check_out_at;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getCarid() {
        return carid;
    }
    public void setCarid(String carid) {
        this.carid = carid;
    }
    public CardType getTipe() {
        return tipe;
    }
    public void setTipe(CardType tipe) {
        this.tipe = tipe;
    }
    public Room getRoom() {
        return room;
    }
    public void setRoom(Room room) {
        this.room = room;
    }
        
}
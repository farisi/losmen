package net.myapp.application.data.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="statuses")
public class Status extends AbstractEntity {
    private String name;

    public Status() {

    }

    public Status(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
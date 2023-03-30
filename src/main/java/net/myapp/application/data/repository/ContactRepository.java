package net.myapp.application.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import net.myapp.application.data.entity.Contact;

public interface ContactRepository extends JpaRepository<Contact,Long>{
    
}

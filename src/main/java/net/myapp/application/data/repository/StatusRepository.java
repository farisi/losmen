package net.myapp.application.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import net.myapp.application.data.entity.Status;

public interface StatusRepository extends JpaRepository<Status,Long>{
    
}

package net.myapp.application.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import net.myapp.application.data.entity.Company;


public interface CompanyRepository extends JpaRepository<Company,Long>{
    
}

package com.onemonth.backend.repository;

import com.onemonth.backend.model.Historico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoricoRepository extends JpaRepository <Historico, Long> {
}

import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ 
    name?: string; 
    lastName?: string; 
    email?: string; 
    password?: string; 
    confirmPassword?: string; 
  }>({});
  


  const router = useRouter();

  const validateFields = () => {
    let newErrors: { 
  name?: string; 
  lastName?: string; 
  email?: string; 
  password?: string; 
  confirmPassword?: string;
} = {};


    // Validar nombre y apellido (no vacíos)
    if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
    if (!lastName.trim()) newErrors.lastName = 'El apellido es obligatorio.';

    // Validar email con regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'El correo es obligatorio.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Formato de correo inválido.';
    }

    // Validar contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria.';
    } else if (!passwordRegex.test(password)) {
      newErrors.password = 'Debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.';
    }

    // Validar repetir contraseña
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar la contraseña.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  const handleRegister = () => {
    if (validateFields()) {
      Alert.alert('Registro exitoso', 'Bienvenido a FitnessHero');
      router.push('/login');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>FitnessHero</Text>
      </View>

      {/* Formulario */}
      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#555"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <TextInput
          style={[styles.input, errors.lastName && styles.inputError]}
          placeholder="Apellido"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#555"
        />
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#555"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#555"
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TextInput
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#555"
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        {/* Botón de registro */}
        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Registrarse</Text>
        </TouchableOpacity>

        {/* Volver al login */}
        <TouchableOpacity onPress={() => router.push('/login')} style={styles.link}>
          <Text style={styles.linkText}>
            ¿Ya tienes cuenta? <Text style={styles.boldText}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8FFE8',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    backgroundColor: '#4B0082',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    alignItems: 'center',
    marginTop: 5,
  },
  linkText: {
    color: '#4B0082',
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    backgroundColor: '#4B0082',
    height: 50,
  },
});

export default RegisterScreen;

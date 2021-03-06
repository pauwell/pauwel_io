/*
  Wallet.js
*/
import MaterialButton from './material-design/MaterialButton.js';

export default {
  name: 'Wallet',
  data(){
    return {
      activeContent: 'welcome',
      encryptionBits: 1024,
      rsaKey: null,
      rsaKeyJSON: '',
      passPhrase: '',
      publicKey: ''
    }
  },
  methods: {
    generateKeys(){
      
      this.rsaKey = cryptico.generateRSAKey(this.passPhrase, this.encryptionBits);
      this.rsaKeyJSON = this.rsaKey.toJSON();
      this.publicKey = cryptico.publicKeyString(this.rsaKey);
      console.log("RsaKey:");
      console.log(this.rsaKey);

      /*console.log("Matt's passphrase: " + this.passPhrase);
      console.log("Bit length: " + this.encryptionBits);
      
      var MattsRSAkey = cryptico.generateRSAKey(this.passPhrase, this.encryptionBits);
      var MattsPublicKeyString = cryptico.publicKeyString(MattsRSAkey);       
      
      console.log("Matt's public key string:");
      console.log(MattsPublicKeyString);
      
      var PlainText = "Matt, I need you to help me with my Starcraft strategy.";
      
      console.log("Sam's message: " + PlainText);
      
      var EncryptionResult = cryptico.encrypt(PlainText, MattsPublicKeyString);
      
      console.log("The encrypted message:");
      console.log(EncryptionResult.cipher);        
      
      var DecryptionResult = cryptico.decrypt(EncryptionResult.cipher, MattsRSAkey);
      
      console.log("The decrypted message:");
      console.log(DecryptionResult.plaintext);        
      console.log("DecryptionResult.signature: " + DecryptionResult.signature);
      this.publicKey = MattsPublicKeyString;*/
    },
    pickPassPhrase(){
      if(this.passPhrase.length >= 10){
        this.activeContent = 'keygen';
      }else{
        alert('Please pick a phrase with at least 10 digits.');
      }
    },
    pickAddress(){
      if(this.publicKey.length != 0){
        this.activeContent = 'finish';
      }else{
        alert('Please press the \'Generate\'-button to generate you address.');
      }
    },
    submitNewAddress(){
      this.$refs.registerForm.submit();
    },
    abort(){
      // Reset all member.
      this.passPhrase = '';
      this.publicKey = '';
      this.activeContent = 'welcome';
    }
  },
  components: {
    MaterialButton
  },
  template: /*html*/`
    <div class="wallet">
      <div class="material-card">
        <h1>Wallet</h1>
      </div>
      <div class="material-card">
        <ol>
        <transition name="fade">
          <li v-if="activeContent !== 'welcome'">Step 1) Passphrase: <i><span>{{passPhrase}}</span></i></li>
        </transition>
        <transition name="fade">
          <li v-if="activeContent !== 'welcome' && activeContent !== 'phrase'">Step 2) Generate address: <i><span>{{publicKey}}</span></i></li>
        </transition>  
        <transition name="fade">  
          <li v-if="activeContent === 'finish'">Step 3) Finish up!</li>
        </transition>
        </ol>
      </div>
      
      <!-- welcome -->
      <transition name="slide">
        <section class="material-card" v-if="activeContent === 'welcome'">
          <h2>Don't have an address yet?</h2>
          <p>Create your wallet and start mining now!</p>
          <material-button @click.native="activeContent='phrase'">Create address</material-button>
          <p>or</p>
          <material-button :hollow="true">
            <i class="fa fa-sign-in"></i>&nbsp;Sign in
          </material-button>
        </section>
      </transition>

      <!-- phrase -->
      <transition name="slide">
      <section class="material-card" v-if="activeContent === 'phrase'">
        <h2>Pick your passphrase</h2>
        <label>Passphrase </label><input type="text" v-model="passPhrase">
        <p></p>
        <material-button @click.native="pickPassPhrase()">Pick</material-button>
        <material-button color="white" @click.native="abort()">Abort</material-button>
      </section>
      </transition>
      
      <!-- keygen -->
      <transition name="slide">
      <section class="material-card" v-if="activeContent === 'keygen'">
        <h2>Generate your address</h2>
        <textarea v-model="publicKey" readonly></textarea>
        <p></p>
        <material-button @click.native="generateKeys()">Generate</material-button>
        <material-button @click.native="pickAddress()">Next</material-button>
        <material-button color="white" @click.native="abort()">Abort</material-button>
      </section>
      </transition>

      <!-- finish -->
      <transition name="slide">
      <section class="material-card" v-if="activeContent === 'finish'">
        <h2>Example</h2>
        <p>Now a short example </p>
        <p>Here follows a short demonstration and a warning to not lose your passphrase!</p>
        <form ref="registerForm" method="GET" action="./php/manage_user.php">
          <input type="hidden" name="cmd" value="register" >
          <input type="hidden" name="address" :value="publicKey">
          <material-button @click.native="submitNewAddress()">Finish</material-button>
        </form>
      </section>
      </transition>
    </div>`
}